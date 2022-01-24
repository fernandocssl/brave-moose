/* ********************************************************************
*                           DEVELOPER CHALLENGE
* Minsait - An Indra Company
* Author: Fernando César de S. Silva - Mat.: 000000
* Date: 23/01/2022
* Description: This class contains a method which is responsible to perform an SOQL query, get specific fields of a custom sObject (Vehicles__c) and return them
******************************************************************** */

// Controller with SOQL request to return sObject vehicles
public with sharing class VehiclesController {
    
    @AuraEnabled (cacheable=true)
    public static List<Vehicle__c> getVehicles(){

        Vehicle__c[] vehList = [SELECT Name, Model__c, Type__c, Levelers__c, Recommended_Passengers__c FROM Vehicle__c ORDER BY CreatedDate DESC LIMIT 5];

        return vehList;
    }
}
