import { useState, useEffect } from "react";
import { Notification } from "../types";

// This would typically be connected to a real API
// For now, we'll use mock data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "new_user",
    title: "New User Registration",
    message: "Rajesh Kumar has registered as a new user",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    userId: "user-1",
  },
  {
    id: "2",
    type: "new_provider",
    title: "New Venue Provider",
    message: "Lakshmi Gardens has registered as a new venue provider",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    providerId: "provider-1",
  },
  {
    id: "3",
    type: "new_user",
    title: "New User Registration",
    message: "Anil Sharma has registered as a new user",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    userId: "user-2",
  },
  {
    id: "4",
    type: "new_provider",
    title: "New Venue Provider",
    message: "Gupta Function Hall has registered as a new venue provider",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    providerId: "provider-2",
  },
  {
    id: "5",
    type: "system",
    title: "System Update",
    message: "The system has been updated to version 2.0",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
];

export const useNotifications = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, "id">) => {
    const newNotification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  // In a real app, you would fetch notifications from an API
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Data is already set via mockNotifications
      setError(null);
    } catch (err) {
      setError("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    addNotification,
    fetchNotifications,
  };
};

export default useNotifications;
