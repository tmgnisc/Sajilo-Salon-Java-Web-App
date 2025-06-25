"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Database, 
  Key, 
  Save,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SuperadminSettingsPage() {
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  
  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: "8",
    passwordPolicy: "strong",
    ipWhitelist: "",
    maxLoginAttempts: "5"
  })

  // Platform Settings
  const [platformSettings, setPlatformSettings] = useState({
    platformName: "Sajilo Salon",
    supportEmail: "support@sajilosalon.com",
    commissionRate: "10",
    maxSalonImages: "10",
    autoApproveSalons: false
  })

  const handleSave = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-2">Configure platform settings and preferences</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Settings */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-indigo-600" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Maintenance Mode</Label>
                <p className="text-xs text-gray-500">Temporarily disable the platform</p>
              </div>
              <Switch
                checked={systemSettings.maintenanceMode}
                onCheckedChange={(checked) => 
                  setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Debug Mode</Label>
                <p className="text-xs text-gray-500">Enable detailed logging</p>
              </div>
              <Switch
                checked={systemSettings.debugMode}
                onCheckedChange={(checked) => 
                  setSystemSettings(prev => ({ ...prev, debugMode: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Auto Backup</Label>
                <p className="text-xs text-gray-500">Automatically backup data daily</p>
              </div>
              <Switch
                checked={systemSettings.autoBackup}
                onCheckedChange={(checked) => 
                  setSystemSettings(prev => ({ ...prev, autoBackup: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Email Notifications</Label>
                <p className="text-xs text-gray-500">Send email alerts to admins</p>
              </div>
              <Switch
                checked={systemSettings.emailNotifications}
                onCheckedChange={(checked) => 
                  setSystemSettings(prev => ({ ...prev, emailNotifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">SMS Notifications</Label>
                <p className="text-xs text-gray-500">Send SMS alerts for critical events</p>
              </div>
              <Switch
                checked={systemSettings.smsNotifications}
                onCheckedChange={(checked) => 
                  setSystemSettings(prev => ({ ...prev, smsNotifications: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                <p className="text-xs text-gray-500">Require 2FA for admin access</p>
              </div>
              <Switch
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => 
                  setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Session Timeout (hours)</Label>
              <Select 
                value={securitySettings.sessionTimeout} 
                onValueChange={(value) => 
                  setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="12">12 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Password Policy</Label>
              <Select 
                value={securitySettings.passwordPolicy} 
                onValueChange={(value) => 
                  setSecuritySettings(prev => ({ ...prev, passwordPolicy: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                  <SelectItem value="strong">Strong (12+ chars, symbols)</SelectItem>
                  <SelectItem value="very-strong">Very Strong (16+ chars, symbols, numbers)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Max Login Attempts</Label>
              <Select 
                value={securitySettings.maxLoginAttempts} 
                onValueChange={(value) => 
                  setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="10">10 attempts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">IP Whitelist (optional)</Label>
              <Textarea 
                placeholder="Enter IP addresses, one per line"
                value={securitySettings.ipWhitelist}
                onChange={(e) => 
                  setSecuritySettings(prev => ({ ...prev, ipWhitelist: e.target.value }))
                }
                className="h-20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Platform Settings */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-600" />
              Platform Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Platform Name</Label>
              <Input
                value={platformSettings.platformName}
                onChange={(e) => 
                  setPlatformSettings(prev => ({ ...prev, platformName: e.target.value }))
                }
                placeholder="Enter platform name"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Support Email</Label>
              <Input
                type="email"
                value={platformSettings.supportEmail}
                onChange={(e) => 
                  setPlatformSettings(prev => ({ ...prev, supportEmail: e.target.value }))
                }
                placeholder="support@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Commission Rate (%)</Label>
              <Input
                type="number"
                value={platformSettings.commissionRate}
                onChange={(e) => 
                  setPlatformSettings(prev => ({ ...prev, commissionRate: e.target.value }))
                }
                placeholder="10"
                min="0"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Max Salon Images</Label>
              <Input
                type="number"
                value={platformSettings.maxSalonImages}
                onChange={(e) => 
                  setPlatformSettings(prev => ({ ...prev, maxSalonImages: e.target.value }))
                }
                placeholder="10"
                min="1"
                max="50"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Auto-approve Salons</Label>
                <p className="text-xs text-gray-500">Automatically approve new salon applications</p>
              </div>
              <Switch
                checked={platformSettings.autoApproveSalons}
                onCheckedChange={(checked) => 
                  setPlatformSettings(prev => ({ ...prev, autoApproveSalons: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-indigo-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Database</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">API Services</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Email Service</span>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">File Storage</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">System Information</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Last backup: 2 hours ago<br />
                    Database size: 2.4 GB<br />
                    Active sessions: 1,247
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 