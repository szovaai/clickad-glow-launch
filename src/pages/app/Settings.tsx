import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Users, Shield, Bell, Palette, Save, Loader2, Mail, Key } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, profile, roles, isAgencyUser, hasRole } = useAuth();
  const isAdmin = hasRole("agency_admin");

  // Account tab state
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [saving, setSaving] = useState(false);
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // Team tab state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("agency_support");

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName })
        .eq("user_id", user.id);
      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordNew !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordNew.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwordNew });
      if (error) throw error;
      toast.success("Password updated successfully");
      setPasswordCurrent("");
      setPasswordNew("");
      setPasswordConfirm("");
    } catch (err: any) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  const roleLabel = (role: string) => {
    const labels: Record<string, string> = {
      agency_admin: "Agency Admin",
      agency_support: "Agency Support",
      client_owner: "Client Owner",
      client_staff: "Client Staff",
    };
    return labels[role] || role;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Account settings, team management, and configuration.</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="account" className="gap-2">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
          {isAgencyUser && (
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
          )}
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email || ""} disabled className="bg-muted/30" />
                  <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Roles</Label>
                <div className="flex flex-wrap gap-2">
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <Badge key={role} variant="secondary">
                        {roleLabel(role)}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No roles assigned.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab (agency users only) */}
        {isAgencyUser && (
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Management
                </CardTitle>
                <CardDescription>
                  {isAdmin
                    ? "Manage your team members and their access levels."
                    : "View your team. Only admins can manage members."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isAdmin && (
                  <>
                    <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-center space-y-3">
                      <Mail className="h-8 w-8 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Invite Team Members</p>
                        <p className="text-sm text-muted-foreground">
                          Send an invitation to add new members to your agency.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                        <Input
                          placeholder="colleague@company.com"
                          type="email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                        />
                        <select
                          value={inviteRole}
                          onChange={(e) => setInviteRole(e.target.value)}
                          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="agency_support">Support</option>
                          <option value="agency_admin">Admin</option>
                        </select>
                        <Button
                          onClick={() => {
                            toast.info("Team invitations coming soon!");
                            setInviteEmail("");
                          }}
                        >
                          Invite
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Current Member</h4>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{profile?.display_name || "You"}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {roles.map((role) => (
                        <Badge key={role} variant="outline">
                          {roleLabel(role)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-w-md space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordNew}
                    onChange={(e) => setPasswordNew(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                <Button onClick={handleChangePassword} disabled={changingPassword || !passwordNew}>
                  {changingPassword ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Shield className="h-4 w-4 mr-2" />}
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-dashed border-muted-foreground/30 p-8 text-center space-y-2">
                <Bell className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="font-medium text-foreground">Coming Soon</p>
                <p className="text-sm text-muted-foreground">
                  Email and in-app notification preferences will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
