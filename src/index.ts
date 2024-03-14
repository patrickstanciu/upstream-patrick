import { initializeProviders } from "./initializeProviders";

initializeProviders().then(async (providers) => {
  const { messageDisplayService, databaseSchemaService, emailImportService } = providers;

  await databaseSchemaService.resetDatabaseSchemaAndData();
  await emailImportService.import();
  await messageDisplayService.displayMessages();
});
