public with sharing class ContactsController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(Id accountId) {
        List<Contact> relatedContacts = [SELECT Name, Title, Email, Phone 
                                               FROM Contact 
                                               WHERE AccountId = :accountId];
        return relatedContacts;
    }
}