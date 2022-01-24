import { LightningElement, wire, track } from 'lwc';

import loadVehicles from "@salesforce/apex/VehiclesController.getVehicles";

import MY_VEHICLE_OBJECT from "@salesforce/schema/Vehicle__c";

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import VEHICLE_MODEL_FIELD from "@salesforce/schema/Vehicle__c.Model__c";
import VEHICLE_NAME_FIELD from "@salesforce/schema/Vehicle__c.Name";
import VEHICLE_TYPE_FIELD from "@salesforce/schema/Vehicle__c.Type__c";
import VEHICLE_LEVELERS_FIELD from "@salesforce/schema/Vehicle__c.Levelers__c";
import VEHICLE_PASSENGERS_FIELD from "@salesforce/schema/Vehicle__c.Recommended_Passengers__c";

const columns = [
    { label: 'Model', fieldName: 'Model__c'},
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type__c'},
    { label: 'Levelers', fieldName: 'Levelers__c'},
    { label: 'Max Passengers', fieldName: 'Recommended_Passengers__c'}
];

// Assembling vehicles with records
export default class VehiclesList extends LightningElement {

    columns = columns;

    objName = MY_VEHICLE_OBJECT;
    fields = [VEHICLE_NAME_FIELD, VEHICLE_MODEL_FIELD, VEHICLE_TYPE_FIELD, VEHICLE_LEVELERS_FIELD, VEHICLE_PASSENGERS_FIELD];

    showVehiclesForm = false;

    @track vehiclesList;

    // Using wire to read new data or error
    @wire(loadVehicles)
    vehicles({data, error}){
        if (data){
            this.vehiclesList = data;
            console.log('Return', JSON.stringify(data));
        } else if (error) {
            console.error(error);
        }
    }

    // Switch that shows/hides creation fields
    handleNewVehicle(){
        this.showVehiclesForm = !this.showVehiclesForm;
    }

    // Pause data form submission, hide creation fields and insert new vehicle at the top of the list
    handleSubmit(event){
        event.preventDefault();
        const fieldsToSave = event.detail.fields;
        this.template.querySelector('lightning-record-form').submit(fieldsToSave);

        this.showVehiclesForm = !this.showVehiclesForm;

        this.vehiclesList = [event.detail.fields, ...this.vehiclesList];
    }

    // Fire function ShowToast - success
    handleSuccess(){
        
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'The vehicle was successfully added! ',
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }

}