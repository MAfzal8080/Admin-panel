
export interface AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface telegram {
  _id: string,
  chatId: number,
  isBlock: boolean,
  isSubscribe: boolean,
  username: string,
  conversations: {
    message: string,
    timestamp: Date
  }
}

export interface User {
  email: string | null,
  picture: string | null,
  token: string | null
}