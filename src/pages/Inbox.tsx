import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Search, Send, Paperclip, MoreHorizontal, Mail, MessageSquare, Bell, Users, Zap, Filter, Plus, Check } from 'lucide-react';
import { Badge, Button, Tooltip } from '../components/ui';

const conversations = [
  { id: 1, name: 'Sophia Martinez', preview: 'What time is check-in?', time: '2:14 PM', unread: 2, channel: 'chat', avatar: 'SM' },
  { id: 2, name: 'Marcus Chen', preview: 'Can I add a 3rd guest?', time: '1:48 PM', unread: 0, channel: 'email', avatar: 'MC' },
  { id: 3, name: 'Broadcast: All guests', preview: 'Reminder: Check-in instructions', time: '12:00 PM', unread: 0, channel: 'broadcast', avatar: null },
  { id: 4, name: 'Aisha Patel', preview: 'Thank you! We had a great time', time: '11:30 AM', unread: 0, channel: 'sms', avatar: 'AP' },
  { id: 5, name: 'Liam Torres', preview: 'Is there parking available?', time: 'Yesterday', unread: 1, channel: 'chat', avatar: 'LT' },
];

const messages = [
  { id: 1, from: 'them', text: 'Hi! Looking forward to our stay. What time is check-in?', time: '2:12 PM' },
  { id: 2, from: 'me', text: 'Hi Sophia! Check-in is at 3 PM. I\'ll send you the door code an hour before arrival.', time: '2:14 PM' },
  { id: 3, from: 'them', text: 'What time is check-in?', time: '2:14 PM' },
];

function ChatsView() {
  const [activeConvo, setActiveConvo] = useState(1);
  const [input, setInput] = useState('');

  return (
    <div className="flex h-[calc(100vh-3.5rem-2.5rem)]">
      {/* Conversation list */}
      <div className="w-72 border-r border-slate-200 bg-white flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input type="text" placeholder="Search messages..." className="input pl-9 h-9 text-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveConvo(c.id)}
              className={`w-full flex items-start gap-3 px-3 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left ${activeConvo === c.id ? 'bg-sky-50' : ''}`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {c.avatar || <Users className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-800 truncate">{c.name}</span>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">{c.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{c.preview}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  {c.channel === 'chat' && <MessageSquare className="w-3 h-3 text-slate-400" />}
                  {c.channel === 'email' && <Mail className="w-3 h-3 text-slate-400" />}
                  {c.channel === 'sms' && <MessageSquare className="w-3 h-3 text-slate-400" />}
                  {c.channel === 'broadcast' && <Users className="w-3 h-3 text-slate-400" />}
                </div>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat panel */}
      <div className="flex-1 flex flex-col bg-surface-50 min-w-0">
        <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold">SM</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800">Sophia Martinez</p>
            <p className="text-xs text-slate-400">Booking BK-4421 · Rooftop Suite</p>
          </div>
          <Tooltip content="More actions" position="left">
            <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><MoreHorizontal className="w-4 h-4" /></button>
          </Tooltip>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${m.from === 'me' ? 'bg-sky-600 text-white' : 'bg-white border border-slate-200 text-slate-700'} rounded-2xl px-4 py-2.5`}>
                <p className="text-sm">{m.text}</p>
                <p className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-sky-200' : 'text-slate-400'}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-end gap-2">
            <Tooltip content="Attach file" position="top">
              <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"><Paperclip className="w-4 h-4" /></button>
            </Tooltip>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              rows={1}
              className="input resize-none flex-1"
            />
            <Button variant="primary" icon={<Send className="w-4 h-4" />}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationView() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">5 active automations</p>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>New automation</Button>
      </div>
      <div className="space-y-3">
        {[
          { name: 'Pre-arrival message', trigger: '24h before check-in', action: 'Send chat message', active: true, runs: 142 },
          { name: 'Post-stay review request', trigger: '48h after checkout', action: 'Send email', active: true, runs: 98 },
          { name: 'Booking confirmation', trigger: 'On booking confirmed', action: 'Send email + SMS', active: true, runs: 214 },
          { name: 'Payment failed alert', trigger: 'On payment failure', action: 'Notify vendor + guest', active: true, runs: 12 },
          { name: 'Birthday greeting', trigger: 'Guest birthday', action: 'Send email', active: false, runs: 3 },
        ].map((a) => (
          <div key={a.name} className="card p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.active ? 'bg-sky-50 text-sky-600' : 'bg-slate-100 text-slate-400'}`}>
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">{a.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                <span className="font-medium text-slate-600">When:</span> {a.trigger} → <span className="font-medium text-slate-600">Then:</span> {a.action}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-slate-400">Runs</p>
              <p className="text-sm font-semibold text-slate-800">{a.runs}</p>
            </div>
            <Badge variant={a.active ? 'success' : 'neutral'} dot>{a.active ? 'Active' : 'Paused'}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

const subTabs = [
  { id: '/inbox/chats', label: 'Chats' },
  { id: '/inbox/email', label: 'Email' },
  { id: '/inbox/sms', label: 'SMS' },
  { id: '/inbox/broadcast', label: 'Broadcast' },
  { id: '/inbox/automation', label: 'Automation' },
  { id: '/inbox/notifications', label: 'Notifications' },
];

export default function Inbox() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = subTabs.find((t) => location.pathname.startsWith(t.id))?.id || '/inbox/chats';

  return (
    <div className="min-h-full">
      <div className="page-header">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Inbox</h1>
            <p className="text-sm text-slate-500 mt-0.5">Unified communications across all channels</p>
          </div>
          <Button variant="primary" icon={<Send className="w-4 h-4" />}>New message</Button>
        </div>
        <div className="tab-nav">
          {subTabs.map((t) => (
            <button key={t.id} className={`tab-item ${active === t.id ? 'active' : ''}`} onClick={() => navigate(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<ChatsView />} />
        <Route path="/chats" element={<ChatsView />} />
        <Route path="/email" element={<ChatsView />} />
        <Route path="/sms" element={<ChatsView />} />
        <Route path="/broadcast" element={<ChatsView />} />
        <Route path="/automation" element={<AutomationView />} />
        <Route path="/notifications" element={<ChatsView />} />
        <Route path="/*" element={<ChatsView />} />
      </Routes>
    </div>
  );
}
