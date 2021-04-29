import {IAuth} from '../../models';
import {AuthModel, AuthType} from '../../database';

class AuthService {
  createTokenPair = (tokenObject: Partial<IAuth>): Promise<IAuth> => {
    const createTokens = new AuthModel(tokenObject);

    return createTokens.save();
  }

  removeAccessToken(removeTokens: { accessToken?: string, refreshToken?: string }): Promise<AuthType | null> {
    return AuthModel.findOneAndDelete(removeTokens) as any;
  }

  findUserByAccessToken(tokens: { accessToken?: string, refreshToken?: string }): Promise<any | null> {
    return AuthModel
      .findOne(tokens)
      .populate('userID')
      .select({userId: 1, _id: 0}).exec() as any;
  }
}

export const authService = new AuthService();

