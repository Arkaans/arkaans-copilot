import interactionsRoutes from "../routes/interactions.js";
import userVerificationRoutes from "../routes/userVerification.js";
import termsOfServiceRoutes from "../routes/termsOfService.js";
import privacyPolicyRoutes from "../routes/privacyPolicy.js";

export const getRoutes = (app) => {
  app.use(interactionsRoutes);
  app.use(userVerificationRoutes);
  app.use(termsOfServiceRoutes);
  app.use(privacyPolicyRoutes);
};
