const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() ?? '';
const email = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? '';

export const contactDeliveryConfig = {
  endpoint,
  email,
  envKeys: {
    VITE_FORMSPREE_ENDPOINT: endpoint ? 'Connected' : 'Not configured',
    VITE_CONTACT_EMAIL: email ? 'Connected' : 'Not configured',
  },
  guidance: endpoint
    ? 'Project inquiries are delivered securely through your configured form endpoint.'
    : email
      ? 'Submitting the form opens a pre-filled email draft for you to review and send.'
      : 'To enable delivery, configure a Formspree endpoint or a contact email in your deployment environment.',
};
