import React, { useState, useEffect } from 'react';
import { createLegalDocument, updateLegalDocument, publishLegalDocument } from '../api';

const AdminLegal = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [formData, setFormData] = useState({
    type: 'terms-of-use',
    title: '',
    content: '',
    summary: '',
    version: '1.0',
    language: 'en',
    region: 'US',
    acceptanceRequired: true,
    metaTitle: '',
    metaDescription: ''
  });

  const documentTypes = [
    { value: 'terms-of-use', label: 'Terms of Use' },
    { value: 'privacy-policy', label: 'Privacy Policy' },
    { value: 'cookie-policy', label: 'Cookie Policy' },
    { value: 'data-processing-agreement', label: 'Data Processing Agreement' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (editingDocument) {
        result = await updateLegalDocument(editingDocument.id, formData);
      } else {
        result = await createLegalDocument(formData);
      }

      if (result.error) {
        alert('Error: ' + result.error);
      } else {
        alert('Document saved successfully!');
        setShowForm(false);
        setEditingDocument(null);
        setFormData({
          type: 'terms-of-use',
          title: '',
          content: '',
          summary: '',
          version: '1.0',
          language: 'en',
          region: 'US',
          acceptanceRequired: true,
          metaTitle: '',
          metaDescription: ''
        });
      }
    } catch (error) {
      alert('Error saving document: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (documentId) => {
    if (!window.confirm('Are you sure you want to publish this document? This will make it live and archive any previous versions.')) {
      return;
    }

    try {
      const result = await publishLegalDocument(documentId);
      if (result.error) {
        alert('Error publishing document: ' + result.error);
      } else {
        alert('Document published successfully!');
      }
    } catch (error) {
      alert('Error publishing document: ' + error.message);
    }
  };

  const handleEdit = (document) => {
    setEditingDocument(document);
    setFormData({
      type: document.type,
      title: document.title,
      content: document.content,
      summary: document.summary,
      version: document.version,
      language: document.language,
      region: document.region,
      acceptanceRequired: document.acceptanceRequired,
      metaTitle: document.metaTitle || '',
      metaDescription: document.metaDescription || ''
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Legal Document Management</h1>
          <p className="mt-2 text-gray-600">Create and manage legal documents for your application</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Documents</h2>
              <p className="text-sm text-gray-500">Manage your legal documents and policies</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create New Document
            </button>
          </div>
        </div>

        {/* Document Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingDocument ? 'Edit Document' : 'Create New Document'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {documentTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Version
                  </label>
                  <input
                    type="text"
                    name="version"
                    value={formData.version}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief summary of the document"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content (HTML)
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={20}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="Enter HTML content for the document..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="US">United States</option>
                    <option value="EU">European Union</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptanceRequired"
                    checked={formData.acceptanceRequired}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Acceptance Required
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingDocument(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Saving...' : 'Save Document'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Quick Create Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Create</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {documentTypes.map(type => (
              <button
                key={type.value}
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    type: type.value,
                    title: type.label,
                    content: `<h1>${type.label}</h1>\n\n<p>Enter your ${type.label.toLowerCase()} content here...</p>`
                  }));
                  setShowForm(true);
                }}
                className="p-4 text-center border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">How to Use</h3>
          <div className="text-blue-800 space-y-2">
            <p>1. <strong>Create Document:</strong> Click "Create New Document" or use Quick Create buttons</p>
            <p>2. <strong>Enter Content:</strong> Fill in the title, summary, and HTML content</p>
            <p>3. <strong>Save as Draft:</strong> Save your document as a draft first</p>
            <p>4. <strong>Publish:</strong> Once ready, publish the document to make it live</p>
            <p>5. <strong>Access:</strong> Published documents are available at <code>/legal/{'{type}'}</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLegal;