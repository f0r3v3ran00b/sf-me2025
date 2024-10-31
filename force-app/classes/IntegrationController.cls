public with sharing class IntegrationController {
    @AuraEnabled
    public static void processIntegrations(String integrationsJson) {
        // Log the received JSON string
        System.debug('Received integrations JSON: ' + integrationsJson);

        // Optionally, deserialize and process the integrations data
        try {
            List<Object> integrations = (List<Object>) JSON.deserializeUntyped(integrationsJson);
            System.debug('Deserialized integrations: ' + integrations);
            // Perform any server-side processing here
        } catch (Exception e) {
            System.debug('Error deserializing integrations JSON: ' + e.getMessage());
        }
    }
}