/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - REST API Client for Spring Boot Backend
 * Supports:
 * - Base URL configuration (VITE_API_BASE_URL, default: http://localhost:8080/api/v1)
 * - Bearer JWT Token Authorization header injection
 * - Offline mock fallback
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export class ApiClient {
  private static token: string | null = localStorage.getItem('jwt_token');

  public static setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('jwt_token', token);
    } else {
      localStorage.removeItem('jwt_token');
    }
  }

  public static getToken(): string | null {
    return this.token;
  }

  public static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      // Log for developer debugging when connecting to real Spring Boot server
      console.warn(`[Spring Boot API Client] Request to ${url} not reachable, using mock service layer:`, error);
      throw error;
    }
  }
}
