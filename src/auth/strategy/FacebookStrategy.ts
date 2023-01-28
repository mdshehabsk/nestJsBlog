import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/redirect',
      profileFields: ['id', 'displayName','photos', 'email',],
      Proxy:true
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done:Function,
  ) {
    const user = {
      id: profile.id,
      name: profile.displayName,
      picture: profile.photos[0].value,
    };
    done(null,user);
  }
}
