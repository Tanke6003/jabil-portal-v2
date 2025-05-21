// Por ejemplo, en src/app/auth/login/login-response.model.ts
export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  department: string;
}

// Y en src/app/auth/register/register-request.model.ts
export interface RegisterRequest {
  username: string;
  password: string;
  fullName: string;
  email: string;
  department: string;
}

export interface Application {
  id:           number;
  name:         string;
  url:          string;
  description:  string;
  version:      string;
  ownerName:    string;
  smeName:      string;
  department:   string;
}
export interface ApplicationCreate {
  name:         string;
  url:          string;
  description:  string;
  dbServer:     string;
  dbName:       string;
  repoUrl:      string;
  version:      string;
  ownerUserId:  number;
  smeUserId:    number;
  supportEmail: string;
  department:   string;
}
