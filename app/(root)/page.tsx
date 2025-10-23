'use client'
import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Star, Inbox, Send, File, Trash2, Archive, ChevronLeft, Paperclip } from 'lucide-react';

export default function OutlookLayout() {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showFolders, setShowFolders] = useState(false);
  const [showEmailList, setShowEmailList] = useState(true);
  const [folderWidth, setFolderWidth] = useState(256);
  const [emailListWidth, setEmailListWidth] = useState(384);
  const [isResizingFolder, setIsResizingFolder] = useState(false);
  const [isResizingEmailList, setIsResizingEmailList] = useState(false);
  
  const containerRef = useRef(null);

  const folders = [
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: 12 },
    { id: 'starred', name: 'Starred', icon: Star, count: 3 },
    { id: 'sent', name: 'Sent', icon: Send, count: 0 },
    { id: 'drafts', name: 'Drafts', icon: File, count: 2 },
    { id: 'archive', name: 'Archive', icon: Archive, count: 0 },
    { id: 'trash', name: 'Trash', icon: Trash2, count: 5 },
  ];

  const emails = [
    {
      id: 1,
      from: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      subject: 'Q4 Marketing Strategy Review',
      preview: 'Hi team, I wanted to share the preliminary results from our Q4 campaign analysis...',
      time: '10:30 AM',
      unread: true,
      starred: true,
      hasAttachment: true,
      body: 'Hi team,\n\nI wanted to share the preliminary results from our Q4 campaign analysis. The numbers are looking very promising, with a 23% increase in engagement compared to Q3.\n\nKey highlights:\n- Email open rates increased by 15%\n- Social media engagement up 31%\n- Conversion rates improved by 18%\n\nLet\'s schedule a meeting next week to discuss how we can build on this momentum for Q1.\n\nBest regards,\nSarah'
    },
    {
      id: 2,
      from: 'Michael Chen',
      email: 'mchen@techcorp.com',
      subject: 'Project Timeline Update',
      preview: 'The development team has completed the first milestone ahead of schedule...',
      time: '9:15 AM',
      unread: true,
      starred: false,
      hasAttachment: false,
      body: 'Hello,\n\nThe development team has completed the first milestone ahead of schedule. We\'re now moving into phase 2 of the project.\n\nNext steps:\n1. Begin UI/UX implementation\n2. Set up testing environment\n3. Schedule stakeholder review\n\nExpected completion date remains on track for end of month.\n\nThanks,\nMichael'
    },
    {
      id: 3,
      from: 'Emma Wilson',
      email: 'ewilson@design.co',
      subject: 'Design Mockups Ready for Review',
      preview: 'I\'ve finished the mockups for the new landing page. Please take a look...',
      time: 'Yesterday',
      unread: false,
      starred: true,
      hasAttachment: true,
      body: 'Hi there,\n\nI\'ve finished the mockups for the new landing page. Please take a look and let me know if any revisions are needed.\n\nThe design focuses on:\n- Clean, modern aesthetic\n- Mobile-first approach\n- Improved user flow\n- Brand consistency\n\nLooking forward to your feedback!\n\nEmma'
    },
    {
      id: 4,
      from: 'David Park',
      email: 'dpark@sales.com',
      subject: 'Follow-up: Client Meeting Notes',
      preview: 'Here are the key takeaways from today\'s client presentation...',
      time: 'Yesterday',
      unread: false,
      starred: false,
      hasAttachment: true,
      body: 'Team,\n\nHere are the key takeaways from today\'s client presentation:\n\n- Client is interested in our premium package\n- Requested additional security features\n- Budget approved for Q1 implementation\n- Next meeting scheduled for two weeks\n\nI\'ll send the formal proposal by Friday.\n\nDavid'
    },
    {
      id: 5,
      from: 'Lisa Anderson',
      email: 'landerson@hr.com',
      subject: 'Team Building Event - Save the Date',
      preview: 'Excited to announce our annual team building event will be held on...',
      time: 'Oct 14',
      unread: false,
      starred: false,
      hasAttachment: false,
      body: 'Hi everyone,\n\nExcited to announce our annual team building event will be held on November 15th at Riverside Park.\n\nActivities include:\n- Team challenges\n- BBQ lunch\n- Awards ceremony\n- Networking session\n\nPlease RSVP by October 30th.\n\nBest,\nLisa'
    },
  ];

  const handleFolderClick = (folderId) => {
    setSelectedFolder(folderId);
    setShowFolders(false);
    setShowEmailList(true);
    setSelectedEmail(null);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowEmailList(false);
  };

  const handleBackToList = () => {
    setShowEmailList(true);
    setSelectedEmail(null);
  };

  const handleBackToFolders = () => {
    setShowFolders(true);
    setShowEmailList(false);
  };

  const startResizingFolder = (e) => {
    e.preventDefault();
    setIsResizingFolder(true);
  };

  const startResizingEmailList = (e) => {
    e.preventDefault();
    setIsResizingEmailList(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingFolder && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth = e.clientX - containerRect.left;
        if (newWidth >= 200 && newWidth <= 400) {
          setFolderWidth(newWidth);
        }
      }
      if (isResizingEmailList && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth = e.clientX - containerRect.left - folderWidth;
        if (newWidth >= 300 && newWidth <= 600) {
          setEmailListWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingFolder(false);
      setIsResizingEmailList(false);
    };

    if (isResizingFolder || isResizingEmailList) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizingFolder, isResizingEmailList, folderWidth]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">      
      <div className="flex-1 flex overflow-hidden" ref={containerRef}>
        {/* Folder Pane - Left */}
        <div 
          className={`
            ${showFolders ? 'block' : 'hidden'} lg:block
            bg-white border-r border-gray-200 overflow-y-auto
            absolute lg:relative inset-0 lg:inset-auto z-20 lg:z-0
            w-full lg:w-auto
          `}
          style={{ width: window.innerWidth >= 1024 ? `${folderWidth}px` : '100%' }}
        >
          <div className="p-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              + New Email
            </button>
          </div>
          <nav className="px-2">
            {folders.map((folder) => {
              const Icon = folder.icon;
              return (
                <button
                  key={folder.id}
                  onClick={() => handleFolderClick(folder.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition
                    ${selectedFolder === folder.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="flex-1 text-left">{folder.name}</span>
                  {folder.count > 0 && (
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      {folder.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Resize Handle for Folder Pane */}
        <div 
          className="hidden lg:block w-1 hover:w-2 bg-gray-200 hover:bg-blue-500 cursor-col-resize transition-all relative group"
          onMouseDown={startResizingFolder}
        >
          <div className="absolute inset-y-0 -left-1 -right-1"></div>
        </div>

        {/* Email List Pane - Middle */}
        <div 
          className={`
            ${showEmailList ? 'block' : 'hidden'} lg:block
            bg-white border-r border-gray-200 overflow-y-auto
            ${selectedEmail ? 'hidden lg:block' : ''}
            w-full lg:w-auto
          `}
          style={{ width: window.innerWidth >= 1024 ? `${emailListWidth}px` : '100%' }}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-2 lg:hidden">
            <button onClick={handleBackToFolders}>
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold capitalize">{selectedFolder}</h2>
          </div>
          <div className="hidden lg:block p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold capitalize">{selectedFolder}</h2>
          </div>
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => handleEmailClick(email)}
              className={`
                p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition
                ${email.unread ? 'bg-blue-50' : ''}
                ${selectedEmail?.id === email.id ? 'bg-blue-100' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold truncate ${email.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                      {email.from}
                    </h3>
                    {email.starred && <Star size={16} className="text-yellow-500 fill-yellow-500" />}
                    {email.hasAttachment && <Paperclip size={16} className="text-gray-400" />}
                  </div>
                  <p className={`text-sm truncate mb-1 ${email.unread ? 'font-semibold' : ''}`}>
                    {email.subject}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{email.preview}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{email.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Resize Handle for Email List Pane */}
        <div 
          className="hidden lg:block w-1 hover:w-2 bg-gray-200 hover:bg-blue-500 cursor-col-resize transition-all relative group"
          onMouseDown={startResizingEmailList}
        >
          <div className="absolute inset-y-0 -left-1 -right-1"></div>
        </div>

        {/* Reading Pane - Right */}
        <div className={`
          ${selectedEmail ? 'block' : 'hidden'} lg:block
          flex-1 bg-white overflow-y-auto
        `}>
          {selectedEmail ? (
            <div>
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3 lg:hidden">
                <button onClick={handleBackToList}>
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-lg font-semibold truncate">{selectedEmail.subject}</h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedEmail.subject}</h2>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                          {selectedEmail.from[0]}
                        </div>
                        <div>
                          <p className="font-semibold">{selectedEmail.from}</p>
                          <p className="text-sm text-gray-500">{selectedEmail.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Star size={20} className={selectedEmail.starred ? 'text-yellow-500 fill-yellow-500' : ''} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Archive size={20} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{selectedEmail.time}</p>
                </div>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {selectedEmail.body}
                  </p>
                </div>
                {selectedEmail.hasAttachment && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Attachments</p>
                    <div className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200">
                      <Paperclip size={16} />
                      <span className="text-sm">document.pdf</span>
                      <span className="text-xs text-gray-500 ml-auto">2.4 MB</span>
                    </div>
                  </div>
                )}
                <div className="mt-6 flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Reply
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Reply All
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Forward
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <Inbox size={64} className="mx-auto mb-4 opacity-50" />
                <p>Select an email to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}