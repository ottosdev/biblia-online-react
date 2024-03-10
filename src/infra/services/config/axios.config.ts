import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

export class AxiosConfig {
  protected readonly instance: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private getUserFromLocalStorage() {
    const userAuthorization = localStorage.getItem("@auth");
    let data = "";
    if (userAuthorization) {
      data = userAuthorization;
    }
    return data;
  }

  protected handleRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    const token = this.getUserFromLocalStorage();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  }

  protected handleResponse(response: AxiosResponse) {
    return response.data;
  }

  protected handleError(error: any): any {
    toast.error(error.message);
    return Promise.reject(error);
  }

  protected initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this.handleRequest.bind(this),
      this.handleError.bind(this)
    );
  }

  protected initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this.handleResponse.bind(this),
      async (error: AxiosError) => {
        if (!error.response) {
          toast.error(error.message, {
            duration: 3000,
          });
        }
        switch (error.response && error.response.status) {
          case 401:
            toast.error("Redirecionando para tela de login", {
              duration: 3000,
              onAutoClose: () => {
                window.location.href = "/sign-in";
                localStorage.removeItem("@auth");
              },
              action: {
                label: "Ir tela login",
                onClick: () => {
                  window.location.href = "/sign-in";
                  localStorage.removeItem("@auth");
                },
              },
            });
            break;
          case 403:
            break;
          default:
            this.handleError(error);
        }
        return Promise.reject(error);
      }
    );
  }
}
