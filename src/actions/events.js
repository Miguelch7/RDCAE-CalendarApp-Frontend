import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStartAddNew = event => {

    return async ( dispatch, getState ) => {

        const { auth: { uid, name } } = getState();

        try {
            const resp = await fetchWithToken( 'events', event, 'POST' );
            const body = await resp.json();
    
            if ( body.ok ) {
                event.id = body.evento.id;
                
                event.user = {
                    _id: uid,
                    name 
                };

                dispatch( eventAddNew( event ) );
            };
        } catch ( error ) {
            console.log( error );  
        };

    };

};

const eventAddNew = event => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = event => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActive = () => ({
    type: types.eventClearActive
});

export const eventStartUpdate = event => {

    return async dispatch => {

        try {
            const resp = await fetchWithToken( `events/${ event.id }`, event, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdate( event ) );
            } else {
                Swal.fire( 'Error', body.msg, 'error' );
            };

        } catch ( error ) {
            console.log( error );
        };

    };

};

const eventUpdate = event => ({
    type: types.eventUpdate,
    payload: event
});

export const eventStartDelete = () => {

    return async ( dispatch, getState ) => {

        const { calendar: { activeEvent } } = getState();

        try {
            const resp = await fetchWithToken( `events/${ activeEvent.id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDelete( event ) );
            } else {
                Swal.fire( 'Error', body.msg, 'error' );
            };

        } catch ( error ) {
            console.log( error );
        };

    };

};

const eventDelete = event => ({
    type: types.eventDelete,
    payload: event
});

export const eventStartLoading = () => {

    return async dispatch => {

        try {
            const resp = await fetchWithToken( 'events' );
            const body = await resp.json();

            const events = prepareEvents( body.eventos );
            
            dispatch( eventsLoaded( events ) );

        } catch ( error ) {
            console.log( error );
        };

    };

};

const eventsLoaded = events => ({
    type: types.eventsLoaded,
    payload: events
});

export const eventLogout = () => ({ type: types.eventLogout });