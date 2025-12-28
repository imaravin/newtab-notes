/**
 * Quill Editor Configuration
 */

/**
 * Get Quill toolbar configuration
 * @returns {Object} - Toolbar configuration
 */
export function getToolbarConfig() {
  return {
    container: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ]
  };
}

/**
 * Get full Quill configuration
 * @returns {Object} - Quill configuration
 */
export function getQuillConfig() {
  return {
    modules: {
      toolbar: getToolbarConfig(),
      // Keyboard bindings for better UX
      keyboard: {
        bindings: {
          // Tab to indent/outdent list items
          tab: {
            key: 9,
            handler: function(range, context) {
              // Let default behavior handle it
              return true;
            }
          },
          // Ctrl+S to save (will be handled by app)
          save: {
            key: 'S',
            ctrlKey: true,
            handler: function() {
              // Trigger custom save event
              const event = new CustomEvent('quill-save');
              document.dispatchEvent(event);
              return false;
            }
          }
        }
      }
    },
    theme: 'snow',
    placeholder: 'Start writing your note...'
  };
}

/**
 * Quill list formats mapping
 */
export const LIST_FORMATS = {
  ORDERED: 'ordered',
  BULLET: 'bullet',
  CHECK: 'check',
  CHECKED: 'checked',
  UNCHECKED: 'unchecked'
};

/**
 * Check if Delta contains checklists
 * @param {Object} delta - Quill Delta
 * @returns {boolean} - True if contains checklists
 */
export function hasChecklists(delta) {
  if (!delta || !delta.ops) return false;

  return delta.ops.some(op => {
    if (!op.attributes) return false;
    const listType = op.attributes.list;
    return listType === LIST_FORMATS.CHECK ||
           listType === LIST_FORMATS.CHECKED ||
           listType === LIST_FORMATS.UNCHECKED;
  });
}

/**
 * Extract checklist items from Delta
 * Note: This is a basic extraction. The NotesService has a more complete version.
 * @param {Object} delta - Quill Delta
 * @returns {Array} - Checklist items
 */
export function extractChecklistsFromDelta(delta) {
  if (!delta || !delta.ops) return [];

  const items = [];
  let currentText = '';
  let isChecklist = false;
  let isChecked = false;

  delta.ops.forEach(op => {
    if (op.attributes && op.attributes.list) {
      const listType = op.attributes.list;

      if (listType === LIST_FORMATS.CHECK ||
          listType === LIST_FORMATS.CHECKED ||
          listType === LIST_FORMATS.UNCHECKED) {
        isChecklist = true;
        isChecked = listType === LIST_FORMATS.CHECKED;
      } else {
        isChecklist = false;
      }
    }

    if (typeof op.insert === 'string') {
      if (isChecklist && op.insert.trim() && op.insert !== '\n') {
        currentText += op.insert;
      } else if (isChecklist && op.insert === '\n' && currentText.trim()) {
        items.push({
          text: currentText.trim(),
          completed: isChecked
        });
        currentText = '';
      }
    }
  });

  // Add last item if exists
  if (currentText.trim()) {
    items.push({
      text: currentText.trim(),
      completed: isChecked
    });
  }

  return items;
}

/**
 * Custom Quill formats (if needed for extensions)
 */
export const CUSTOM_FORMATS = {
  // Can add custom formats here in the future
};

/**
 * Initialize Quill with custom settings
 * @param {HTMLElement} container - Container element
 * @param {Object} options - Additional options
 * @returns {Quill} - Quill instance
 */
export function initializeQuill(container, options = {}) {
  const config = {
    ...getQuillConfig(),
    ...options
  };

  // Quill will be imported in the component that uses this
  // This is just a configuration helper
  return config;
}

/**
 * Quill event handlers
 */
export const QUILL_EVENTS = {
  TEXT_CHANGE: 'text-change',
  SELECTION_CHANGE: 'selection-change',
  EDITOR_CHANGE: 'editor-change'
};
