/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

export interface OAuth2Config {
  clientID: string;
  clientSecret: string;
  callbackURI: string;
}

/**
 * Add other providers config here extending it from Oauth2Config , if needed for extra config create another interface and extend this OAuth2Config
 */
export interface AuthConfig {
  jwtKey: string;
  jwtSecret: string;
  googleOAuth2: OAuth2Config;
}
