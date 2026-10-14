import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActiveView, ProfileTab, EmploymentDetailsData, AssessmentMCQState, AssessmentSubjectiveState } from '../types';

interface AppContextType {
  // Navigation & View
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  activeProfileTab: ProfileTab;
  setActiveProfileTab: (tab: ProfileTab) => void;

  // Auth State
  isAuthenticated: boolean;
  userEmail: string;
  login: (email: string, pass: string) => boolean;
  logout: () => void;

  // Profile State
  isConnected: boolean;
  toggleConnect: () => void;
  isAvailable: boolean;
  toggleAvailable: () => void;

  // Employment Details
  employmentData: EmploymentDetailsData;
  updateEmploymentField: (field: keyof EmploymentDetailsData, value: string) => void;
  employmentStep: number;
  setEmploymentStep: (step: number) => void;

  // Assessment MCQ
  assessmentMCQ: AssessmentMCQState;
  selectMCQOption: (index: number) => void;

  // Assessment Subjective
  assessmentSubj: AssessmentSubjectiveState;
  setSubjectiveAnswer: (text: string) => void;

  // Modals & Extras
  isProModalOpen: boolean;
  setIsProModalOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isEditFieldModalOpen: boolean;
  editingField: { key: keyof EmploymentDetailsData; label: string; value: string } | null;
  openEditFieldModal: (key: keyof EmploymentDetailsData, label: string) => void;
  closeEditFieldModal: () => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const defaultEmployment: EmploymentDetailsData = {
  jobTitle: 'Senior UX Designer',
  company: 'Figma',
  employmentType: 'Full-time',
  location: 'Mumbai, India',
  reportsTo: 'Head of Design',
  teamSize: '5 Designers',
  workSchedule: 'Mon – Fri'
};

const STORAGE_KEY = 'rizza_platform_state_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or default
  const savedState = (() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  })();

  // Initialize activeView from URL path if present, otherwise from savedState or default
  const getViewFromPath = (): ActiveView | null => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('assessment-mcq')) return 'assessment-mcq';
    if (path.includes('assessment-subjective')) return 'assessment-subjective';
    if (path.includes('employment-details')) return 'employment-details';
    if (path.includes('projects') || path.includes('profile-projects')) return 'profile-projects';
    if (path.includes('skills') || path.includes('profile-skills')) return 'profile-skills';
    if (path === '/' || path === '') return 'profile-skills';
    return null;
  };

  const initialView = getViewFromPath() || savedState?.activeView || 'profile-skills';
  const [activeView, setActiveViewState] = useState<ActiveView>(initialView);
  const [activeProfileTab, setActiveProfileTabState] = useState<ProfileTab>(
    initialView === 'profile-projects' ? 'projects' : 'skills'
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(savedState?.isAuthenticated ?? true);
  const [userEmail, setUserEmail] = useState<string>(savedState?.userEmail || 'annie.stanley@rizza.com');
  const [isConnected, setIsConnected] = useState<boolean>(savedState?.isConnected ?? false);
  const [isAvailable, setIsAvailable] = useState<boolean>(savedState?.isAvailable ?? true);

  const [employmentData, setEmploymentData] = useState<EmploymentDetailsData>(
    savedState?.employmentData || defaultEmployment
  );
  const [employmentStep, setEmploymentStep] = useState<number>(savedState?.employmentStep || 1);

  const [assessmentMCQ, setAssessmentMCQ] = useState<AssessmentMCQState>(
    savedState?.assessmentMCQ || {
      questionNumber: 4,
      totalQuestions: 20,
      selectedOptionIndex: 1 // Second option selected per screenshot
    }
  );

  const [assessmentSubj, setAssessmentSubj] = useState<AssessmentSubjectiveState>(
    savedState?.assessmentSubj || {
      questionNumber: 12,
      totalQuestions: 20,
      answerText: '',
      attachments: []
    }
  );

  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingField, setEditingField] = useState<{ key: keyof EmploymentDetailsData; label: string; value: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setActiveView = (view: ActiveView) => {
    setActiveViewState(view);
    setIsMobileMenuOpen(false);
    if (view === 'profile-skills') {
      setActiveProfileTabState('skills');
      window.history.pushState({}, '', '/');
    } else if (view === 'profile-projects') {
      setActiveProfileTabState('projects');
      window.history.pushState({}, '', '/projects');
    } else if (view === 'assessment-mcq') {
      window.history.pushState({}, '', '/assessment-mcq');
    } else if (view === 'assessment-subjective') {
      window.history.pushState({}, '', '/assessment-subjective');
    } else if (view === 'employment-details') {
      window.history.pushState({}, '', '/employment-details');
    }
  };

  // Sync profile tab with view
  const setActiveProfileTab = (tab: ProfileTab) => {
    setActiveProfileTabState(tab);
    if (tab === 'projects') {
      setActiveView('profile-projects');
    } else if (tab === 'skills') {
      setActiveView('profile-skills');
    }
  };

  // Listen to browser popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const view = getViewFromPath();
      if (view) {
        setActiveViewState(view);
        if (view === 'profile-projects') setActiveProfileTabState('projects');
        else if (view === 'profile-skills') setActiveProfileTabState('skills');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeView,
        activeProfileTab,
        isAuthenticated,
        userEmail,
        isConnected,
        isAvailable,
        employmentData,
        employmentStep,
        assessmentMCQ,
        assessmentSubj
      }));
    } catch {
      // ignore storage errors
    }
  }, [activeView, activeProfileTab, isAuthenticated, userEmail, isConnected, isAvailable, employmentData, employmentStep, assessmentMCQ, assessmentSubj]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3000);
  };

  const login = (email: string, pass: string) => {
    if ((email === 'annie.stanley@rizza.com' || email.includes('@')) && pass.length >= 1) {
      setIsAuthenticated(true);
      setUserEmail(email);
      setActiveView('profile-skills');
      showToast('Logged in as Annie Stanley');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveView('login');
    showToast('Signed out successfully');
  };

  const toggleConnect = () => {
    setIsConnected(prev => {
      const next = !prev;
      showToast(next ? 'Connection request sent to Annie Stanley' : 'Connection removed');
      return next;
    });
  };

  const toggleAvailable = () => {
    setIsAvailable(prev => !prev);
  };

  const updateEmploymentField = (field: keyof EmploymentDetailsData, value: string) => {
    setEmploymentData(prev => ({ ...prev, [field]: value }));
    showToast(`Updated ${field}`);
  };

  const openEditFieldModal = (key: keyof EmploymentDetailsData, label: string) => {
    setEditingField({ key, label, value: employmentData[key] });
  };

  const closeEditFieldModal = () => {
    setEditingField(null);
  };

  const selectMCQOption = (index: number) => {
    setAssessmentMCQ(prev => ({ ...prev, selectedOptionIndex: index }));
  };

  const setSubjectiveAnswer = (text: string) => {
    setAssessmentSubj(prev => ({ ...prev, answerText: text }));
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        activeProfileTab,
        setActiveProfileTab,
        isAuthenticated,
        userEmail,
        login,
        logout,
        isConnected,
        toggleConnect,
        isAvailable,
        toggleAvailable,
        employmentData,
        updateEmploymentField,
        employmentStep,
        setEmploymentStep,
        assessmentMCQ,
        selectMCQOption,
        assessmentSubj,
        setSubjectiveAnswer,
        isProModalOpen,
        setIsProModalOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isEditFieldModalOpen: editingField !== null,
        editingField,
        openEditFieldModal,
        closeEditFieldModal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
