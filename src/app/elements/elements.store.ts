import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ElementsService } from './elements.service';

export interface Element {
    position: number,
    name: string,
    weight: number,
    symbol: string
}

export type ElementsState = {
    elements: Element[];
    loading: boolean;
}

const initialState: ElementsState = {
    elements: [],
    loading: false
}

export const ElementsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed(store => ({
        elements: computed(() => store.elements()),
        loading: computed(() => store.loading()),
    })),

    withMethods(
        (store, elementsService = inject(ElementsService)) => ({

            loadAll() {
                patchState(store, { loading: true });

                setTimeout(() => {
                    patchState(store, {
                        elements: elementsService.getElements(),
                        loading: false
                    });
                }, 2000);
            },

            updateElement(changedElement: Element) {
                patchState(store, (state) => ({
                    elements: state.elements.map(e =>
                        e.position === changedElement.position ? { ...e, ...changedElement } : e
                    )
                }));
            },

            setLoadingState(state: boolean) {
                patchState(store, { loading: state });
            }

        })),
)