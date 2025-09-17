const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      console.log('Fazendo requisição para:', url, config);
      
      const response = await fetch(url, config);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Erro de conexão. Verifique se o backend está rodando em http://localhost:5000');
      }
      throw error;
    }
  }

  // Autenticação
  async login(email, password) {
    // Limpar dados do perfil anterior antes do login
    this.clearProfileData();
    
    const data = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data.access_token) {
      this.token = data.access_token;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  }

  async register(name, email, password) {
    return await this.request('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.clearProfileData();
  }

  clearProfileData() {
    // Remove todos os dados personalizados do perfil
    localStorage.removeItem('userProfile');
    localStorage.removeItem('profileAvatar');
    localStorage.removeItem('userBio');
    localStorage.removeItem('userLocation');
  }

  // Posts
  async createPost(postData) {
    try {
      console.log('Enviando para API:', postData);
      
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      console.log('Status da resposta:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        console.error('Erro da API:', errorData);
        throw new Error(errorData.error || `Erro ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Post criado com sucesso:', result);
      return result;
      
    } catch (error) {
      console.error('Erro ao criar post:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Erro de conexão. Verifique se o backend está rodando.');
      }
      throw error;
    }
  }

  async getPosts() {
    return await this.request('/posts');
  }

  async getPost(id) {
    return await this.request(`/posts/${id}`);
  }

  async getUserPosts() {
    return await this.request('/user/posts');
  }

  // Curtidas e Seguidores
  async toggleLike(postId) {
    console.log('Curtindo post:', postId);
    const result = await this.request(`/posts/${postId}/like`, {
      method: 'POST'
    });
    console.log('Resultado curtir:', result);
    return result;
  }

  async toggleFollow(userId) {
    console.log('Seguindo usuário:', userId);
    const result = await this.request(`/users/${userId}/follow`, {
      method: 'POST'
    });
    console.log('Resultado seguir:', result);
    return result;
  }

  async getUserStats() {
    return await this.request('/user/stats');
  }

  async getUserActivities() {
    return await this.request('/user/activities');
  }

  async getUserNotifications() {
    return await this.request('/user/notifications');
  }

  async markNotificationRead(notificationId) {
    return await this.request(`/notifications/${notificationId}/read`, {
      method: 'POST'
    });
  }

  // Utilitários
  isAuthenticated() {
    return !!this.token;
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export default new ApiService();