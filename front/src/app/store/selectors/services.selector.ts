import { IAppState } from "../appState";
import {createSelector} from "@ngrx/store"
import { IServicesState } from "../states/services.state";

const selectServices = (state: IAppState) => state.services;

export const selectServicesInner = createSelector(
   selectServices,
   (state: IServicesState) => state.servicesData
);

export const selectCurrentService = createSelector(
   selectServices,
   (state: IServicesState) => state.currentService
);