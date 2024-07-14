import axios from 'axios';
import config from '@config';

const API_URL = config.API_URL + '/bookmarks';

class BookmarkService {
  async createBookmark(bookmarksDTO) {
    try {
      const response = await axios.post(API_URL, bookmarksDTO);
      return response.data;
    } catch (error) {
      console.error('Error creating booark:', error);
      throw error;
    }
  }

  async deleteBookmark(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting Bookmark with ID ${id}:`, error);
      throw error;
    }
  }

  async getBookmarkById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Bookmark with ID ${id}:`, error);
      throw error;
    }
  }

  async getBookmarksByUserId(userId) {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Bookmarks for user with ID ${userId}:`, error);
      throw error;
    }
  }

  async getAllBookmarks() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching all Bookmarks:', error);
      throw error;
    }
  }
}

export default new BookmarkService();
