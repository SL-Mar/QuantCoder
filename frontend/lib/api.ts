// lib/api.ts

const API_BASE_URL = 'http://localhost:8000/summarizer';

function getAuthHeaders(contentType: string = 'application/json') {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    Authorization: `Bearer ${token || ''}`,
  };
  if (contentType) headers['Content-Type'] = contentType;
  return headers;
}

export const api = {
  async extractSummary(file: File): Promise<{ filename: string; summary: string }> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("🚀 Sending PDF to extract:", file.name);
      const response = await fetch(`${API_BASE_URL}/extract`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to extract summary');
      }

      const data = await response.json();
      console.log("📄 Summary extracted successfully:", data);
      return data;
    } catch (error) {
      console.error('❌ Error during extraction:', error);
      throw error;
    }
  },

  async saveSummary(summary: { filename: string; summary: string }): Promise<void> {
    try {
      console.log("💾 Saving summary:", summary.filename);
      const response = await fetch(`${API_BASE_URL}/save`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(summary),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to save summary');
      }

      console.log("✅ Summary saved successfully");
    } catch (error) {
      console.error('❌ Error saving summary:', error);
      throw error;
    }
  },

  async loadSummary(filename: string): Promise<{ content: string }> {
    try {
      console.log("📂 Loading summary:", filename);
      const response = await fetch(`${API_BASE_URL}/load/${filename}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to load summary');
      }

      const data = await response.json();
      console.log("📄 Summary loaded:", data);
      return data;
    } catch (error) {
      console.error('❌ Error loading summary:', error);
      throw error;
    }
  },

  async deleteSummary(filename: string): Promise<void> {
    try {
      console.log("🗑️ Deleting summary:", filename);
      const response = await fetch(`${API_BASE_URL}/${filename}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to delete summary');
      }

      console.log("✅ Summary deleted");
    } catch (error) {
      console.error('❌ Error deleting summary:', error);
      throw error;
    }
  },

  async listSummaries(): Promise<{ summaries: string[] }> {
    try {
      console.log("📃 Fetching list of summaries...");
      const response = await fetch(`${API_BASE_URL}/list`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to list summaries');
      }

      const data = await response.json();
      console.log("📄 Summaries list:", data);
      return data;
    } catch (error) {
      console.error('❌ Error listing summaries:', error);
      throw error;
    }
  }
};

