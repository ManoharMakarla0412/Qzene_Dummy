
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

const SiteManagement = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // General settings
  const [siteName, setSiteName] = useState("Qzene Recipes");
  const [siteDescription, setSiteDescription] = useState("Discover and share amazing recipes.");
  const [contactEmail, setContactEmail] = useState("contact@qzenerecipes.com");
  const [allowRegistrations, setAllowRegistrations] = useState(true);
  
  // Payment settings
  const [currency, setCurrency] = useState("USD");
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [recipesReviewsNotify, setRecipesReviewsNotify] = useState(true);
  const [userSignupsNotify, setUserSignupsNotify] = useState(true);
  const [ordersNotify, setOrdersNotify] = useState(true);
  
  // Maintenance settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("We're performing scheduled maintenance. Please check back soon.");
  
  const handleSaveSettings = (settingType) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Settings saved",
        description: `${settingType} settings have been updated successfully.`
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Site Management</h2>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="payment">Payment Settings</TabsTrigger>
          <TabsTrigger value="notification">Notification Settings</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure site-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea
                    id="site-description"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-registrations">Allow User Registrations</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable or disable new user registrations
                    </div>
                  </div>
                  <Switch
                    id="allow-registrations"
                    checked={allowRegistrations}
                    onCheckedChange={setAllowRegistrations}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("General")}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="stripe-enabled">Stripe Payments</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable or disable Stripe payment processing
                    </div>
                  </div>
                  <Switch
                    id="stripe-enabled"
                    checked={stripeEnabled}
                    onCheckedChange={setStripeEnabled}
                  />
                </div>
                
                {stripeEnabled && (
                  <div className="grid gap-2 pl-6 border-l-2 border-muted">
                    <Label htmlFor="stripe-key">Stripe API Key</Label>
                    <Input
                      id="stripe-key"
                      type="password"
                      placeholder="sk_test_..."
                    />
                    <Label htmlFor="stripe-public-key" className="mt-2">Stripe Public Key</Label>
                    <Input
                      id="stripe-public-key"
                      placeholder="pk_test_..."
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="paypal-enabled">PayPal Payments</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable or disable PayPal payment processing
                    </div>
                  </div>
                  <Switch
                    id="paypal-enabled"
                    checked={paypalEnabled}
                    onCheckedChange={setPaypalEnabled}
                  />
                </div>
                
                {paypalEnabled && (
                  <div className="grid gap-2 pl-6 border-l-2 border-muted">
                    <Label htmlFor="paypal-client-id">PayPal Client ID</Label>
                    <Input
                      id="paypal-client-id"
                      placeholder="client_id_..."
                    />
                    <Label htmlFor="paypal-secret" className="mt-2">PayPal Secret</Label>
                    <Input
                      id="paypal-secret"
                      type="password"
                      placeholder="client_secret_..."
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("Payment")}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notification">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and push notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable or disable all email notifications
                    </div>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                {emailNotifications && (
                  <div className="space-y-3 pl-6 border-l-2 border-muted">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="recipes-reviews-notify">Recipe Reviews</Label>
                      <Switch
                        id="recipes-reviews-notify"
                        checked={recipesReviewsNotify}
                        onCheckedChange={setRecipesReviewsNotify}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="user-signups-notify">User Sign-ups</Label>
                      <Switch
                        id="user-signups-notify"
                        checked={userSignupsNotify}
                        onCheckedChange={setUserSignupsNotify}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="orders-notify">New Orders</Label>
                      <Switch
                        id="orders-notify"
                        checked={ordersNotify}
                        onCheckedChange={setOrdersNotify}
                      />
                    </div>
                  </div>
                )}
                
                <div className="grid gap-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input
                    id="notification-email"
                    type="email"
                    placeholder="notifications@yoursite.com"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This email address will receive all admin notifications
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("Notification")}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
              <CardDescription>Site maintenance and backup tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode" className="text-red-500 font-semibold">Maintenance Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable to display a maintenance message to all users
                    </div>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
                
                {maintenanceMode && (
                  <div className="grid gap-2">
                    <Label htmlFor="maintenance-message">Maintenance Message</Label>
                    <Textarea
                      id="maintenance-message"
                      value={maintenanceMessage}
                      onChange={(e) => setMaintenanceMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}
                
                <div className="grid gap-2 pt-4">
                  <h3 className="font-medium text-lg">Database Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline">
                      Create Backup
                    </Button>
                    <Button variant="outline">
                      Restore Database
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-2 pt-4">
                  <h3 className="font-medium text-lg">Cache Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline">
                      Clear Cache
                    </Button>
                    <Button variant="outline">
                      Rebuild Index
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("Maintenance")}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteManagement;
