export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '97e2da30-59bb-4d00-bfd6-83ead060db70',
      tenantId: '035694e9-d37a-4068-87ca-24fce088b110',
      authority: 'https://login.microsoftonline.com/035694e9-d37a-4068-87ca-24fce088b110',
      redirectUri: "http://localhost:4200",
      // redirectUri: "https://Extrfid-dt.moci.gov.qa/login-res"
    },
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://Extrfid-dt.moci.gov.qa/login-res',
  },
};
