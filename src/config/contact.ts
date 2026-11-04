export const contactDeliveryConfig = {
  provider: 'EmailJS or Formspree',
  envKeys: {
    endpoint: 'VITE_FORMSPREE_ENDPOINT',
    serviceId: 'VITE_EMAILJS_SERVICE_ID',
    templateId: 'VITE_EMAILJS_TEMPLATE_ID',
    publicKey: 'VITE_EMAILJS_PUBLIC_KEY',
  },
  guidance: 'Add the required credentials to a local .env file or your deployment platform environment variables to enable live form submission. No public contact details were invented for this project.',
};
