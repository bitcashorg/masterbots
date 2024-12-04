export interface AdminResponse<T> {
    data?: T;
    error?: string;
  }
  
  export interface BlockUserRequest {
    userId: string;
  }
  
  export interface UpdateSubscriptionRequest {
    userId: string;
    subscriptionId: string | null;
  }