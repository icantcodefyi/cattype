"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Settings, GithubIcon, LogOut } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { useEffect } from "react";
import { useAuthStore, useTypingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export function SettingsDialog({
  open,
  onOpenChange,
  showTrigger = true,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}) {
  const router = useRouter();
  const { session, isLoading, setSession, setIsLoading } = useAuthStore();
  const { settings, setSettings } = useTypingStore();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data) {
          setSession({
            user: data.user ? {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: data.user.image || undefined,
            } : null
          });
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchSession();
    }
  }, [isLoading, setIsLoading, setSession]);

  const handleGithubLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
      });
      // Refetch session after login
      setIsLoading(true);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setSession(null);
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open settings">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {isLoading ? (
            <div>Loading...</div>
          ) : !session ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please sign in to access settings and save your progress.
              </p>
              <Button
                onClick={handleGithubLogin}
                className="w-full flex items-center justify-center gap-2"
              >
                <GithubIcon className="h-5 w-5" />
                Sign in with GitHub
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* User Profile Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session.user?.image || ''} />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{session.user?.name}</p>
                  <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                </div>
              </div>

              <Separator />

              {/* Settings Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sound effects while typing
                    </p>
                  </div>
                  <Switch
                    checked={settings.soundEffects}
                    onCheckedChange={(checked) => setSettings({ soundEffects: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Errors</Label>
                    <p className="text-sm text-muted-foreground">
                      Display errors while typing
                    </p>
                  </div>
                  <Switch
                    checked={settings.showErrors}
                    onCheckedChange={(checked) => setSettings({ showErrors: checked })}
                  />
                </div>
              </div>

              <Separator />

              {/* Sign Out Button */}
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="w-full flex items-center justify-center gap-2"
                aria-label="Sign out of your account"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
