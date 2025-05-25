"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import type { Notification } from "@/components/notification-bell";

interface NotificationDemoProps {
  onSendNotification: (notification: Notification) => void;
}

export function NotificationDemo({
  onSendNotification,
}: NotificationDemoProps) {
  const [title, setTitle] = useState("New funding round");
  const [message, setMessage] = useState(
    "TechStart has created a new Series A funding round"
  );
  const [content, setContent] = useState(
    "TechStart is raising $2,000,000 in their Series A round. They're looking for investors to help them scale their operations and expand to new markets."
  );
  const [roundType, setRoundType] = useState("Series A");
  const [amount, setAmount] = useState("$2,000,000");

  const handleSendNotification = () => {
    const notification = {
      id: `notification-${Date.now()}`,
      title,
      message,
      content,
      timestamp: new Date(),
      read: false,
      startupId: "startup-123",
      roundId: "round-456",
      roundType,
      amount,
    };

    onSendNotification(notification);

    toast({
      title: "Notification sent",
      description: "The notification has been sent successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Demo</CardTitle>
        <CardDescription>
          Send a test notification to see the notification system in action
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Notification Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Notification Message</Label>
          <Input
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Detailed Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">
            This content will be displayed when the notification is clicked
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="roundType">Round Type</Label>
            <Select value={roundType} onValueChange={setRoundType}>
              <SelectTrigger>
                <SelectValue placeholder="Select round type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pre-seed">Pre-seed</SelectItem>
                <SelectItem value="Seed">Seed</SelectItem>
                <SelectItem value="Series A">Series A</SelectItem>
                <SelectItem value="Series B">Series B</SelectItem>
                <SelectItem value="Series C">Series C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSendNotification}>Send Notification</Button>
      </CardFooter>
    </Card>
  );
}
