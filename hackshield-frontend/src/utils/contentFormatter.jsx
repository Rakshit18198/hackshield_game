const formatInlineText = (text) => {
  // Handle bold text **text**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Handle italic text *text*
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Handle inline code `code`
  text = text.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>');

  return text;
};

export const formatContent = (content) => {
  const lines = content.trim().split('\n');
  const elements = [];
  let currentElement = [];
  let elementType = 'p';

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('# ')) {
      if (currentElement.length > 0) {
        elements.push({ type: elementType, content: currentElement.join('\n') });
        currentElement = [];
      }
      elementType = 'h1';
      currentElement = [trimmedLine.substring(2)];
    } else if (trimmedLine.startsWith('## ')) {
      if (currentElement.length > 0) {
        elements.push({ type: elementType, content: currentElement.join('\n') });
        currentElement = [];
      }
      elementType = 'h2';
      currentElement = [trimmedLine.substring(3)];
    } else if (trimmedLine.startsWith('### ')) {
      if (currentElement.length > 0) {
        elements.push({ type: elementType, content: currentElement.join('\n') });
        currentElement = [];
      }
      elementType = 'h3';
      currentElement = [trimmedLine.substring(4)];
    } else if (trimmedLine.startsWith('#### ')) {
      if (currentElement.length > 0) {
        elements.push({ type: elementType, content: currentElement.join('\n') });
        currentElement = [];
      }
      elementType = 'h4';
      currentElement = [trimmedLine.substring(5)];
    } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (elementType !== 'ul') {
        if (currentElement.length > 0) {
          elements.push({ type: elementType, content: currentElement.join('\n') });
          currentElement = [];
        }
        elementType = 'ul';
      }
      currentElement.push(trimmedLine.substring(2));
    } else if (/^\d+\. /.test(trimmedLine)) {
      if (elementType !== 'ol') {
        if (currentElement.length > 0) {
          elements.push({ type: elementType, content: currentElement.join('\n') });
          currentElement = [];
        }
        elementType = 'ol';
      }
      currentElement.push(trimmedLine.replace(/^\d+\. /, ''));
    } else if (trimmedLine.startsWith('```')) {
      if (elementType !== 'code') {
        if (currentElement.length > 0) {
          elements.push({ type: elementType, content: currentElement.join('\n') });
          currentElement = [];
        }
        elementType = 'code';
      } else {
        elements.push({ type: elementType, content: currentElement.join('\n') });
        currentElement = [];
        elementType = 'p';
      }
    } else if (trimmedLine === '' && currentElement.length > 0) {
      elements.push({ type: elementType, content: currentElement.join('\n') });
      currentElement = [];
      elementType = 'p';
    } else if (trimmedLine !== '') {
      if (elementType === 'ul' || elementType === 'ol') {
        if (currentElement.length > 0) {
          elements.push({ type: elementType, content: currentElement.join('\n') });
          currentElement = [];
        }
        elementType = 'p';
      }
      currentElement.push(trimmedLine);
    }
  });

  if (currentElement.length > 0) {
    elements.push({ type: elementType, content: currentElement.join('\n') });
  }

  return elements.map((element, index) => {
    const key = `${element.type}-${index}`;

    switch (element.type) {
      case 'h1':
        return (
          <h1 key={key} className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            {element.content}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={key} className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
            {element.content}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={key} className="text-xl font-semibold text-gray-700 mb-3 mt-6">
            {element.content}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={key} className="text-lg font-medium text-gray-700 mb-2 mt-4">
            {element.content}
          </h4>
        );
      case 'ul':
        return (
          <ul key={key} className="list-disc list-inside mb-4 space-y-1 text-gray-700 ml-4">
            {element.content.split('\n').map((item, i) => (
              <li key={i} className="leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: formatInlineText(item) }} />
              </li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={key} className="list-decimal list-inside mb-4 space-y-1 text-gray-700 ml-4">
            {element.content.split('\n').map((item, i) => (
              <li key={i} className="leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: formatInlineText(item) }} />
              </li>
            ))}
          </ol>
        );
      case 'code':
        return (
          <pre key={key} className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 overflow-x-auto">
            <code className="text-sm text-gray-800 font-mono">{element.content}</code>
          </pre>
        );
      default:
        return element.content ? (
          <p key={key} className="mb-4 text-gray-700 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInlineText(element.content) }} />
          </p>
        ) : null;
    }
  });
};