"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



interface Ad {
  _id: string;
  type: "hero" | "body";
  adUnitId: string;
  adSlotId: string;
  title?: string;
  description?: string;
}

export default function AdminGoogleAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [type, setType] = useState<"hero" | "body">("hero");
  const [adUnitId, setAdUnitId] = useState("");
  const [adSlotId, setAdSlotId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAdId, setDeleteAdId] = useState<string | null>(null);


  const fetchAds = async () => {
    try {
      const res = await fetch("/api/googleAds");
      const data = await res.json();
      setAds(data);
    } catch (error) {
      toast("Failed to fetch ads");
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleSubmit = async () => {
    if ( !adSlotId) {
      toast("Ad Unit ID and Ad Slot ID are required");
      return;
    }

    try {
      const payload = { type, adUnitId, adSlotId, title, description };
      if (editingId) {
        await fetch("/api/googleAds", {
          method: "PUT",
          body: JSON.stringify({ _id: editingId, ...payload }),
        });
        toast("Ad updated successfully");
      } else {
        await fetch("/api/googleAds", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast("Ad created successfully");
      }
      resetForm();
      setIsModalOpen(false);
      fetchAds();
    } catch (error) {
      toast("Failed to save ad");
    }
  };

  const resetForm = () => {
    setType("hero");
    setAdUnitId("");
    setAdSlotId("");
    setTitle("");
    setDescription("");
    setEditingId(null);
  };

  const handleEdit = (ad: Ad) => {
    setType(ad.type);
    setAdUnitId(ad.adUnitId);
    setAdSlotId(ad.adSlotId);
    setTitle(ad.title || "");
    setDescription(ad.description || "");
    setEditingId(ad._id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteAdId) return;

    try {
      await fetch(`/api/googleAds?id=${deleteAdId}`, { method: "DELETE" });
      toast("Ad deleted successfully");
      fetchAds();
    } catch (error) {
      toast("Failed to delete ad");
    } finally {
      setDeleteAdId(null);
    }
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">Google Ads Manager</h1>
            <p className="text-slate-600">Manage your hero and body ad placements</p>
          </div>
          <Button
            onClick={openCreateModal}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Ad
          </Button>
        </div>

        {/* Ads Grid Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">
              Active Ads <span className="text-slate-400 text-lg">({ads.length})</span>
            </h2>
          </div>

          {ads.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <div className="text-slate-400 space-y-2">
                <div className="text-5xl">📭</div>
                <p className="text-lg font-medium">No ads yet</p>
                <p className="text-sm">Create your first ad placement to get started</p>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ads.map((ad) => (
                <Card
                  key={ad._id}
                  className="group hover:shadow-xl transition-all duration-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              ad.type === "hero"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {ad.type === "hero" ? "🎯 HERO" : "📄 BODY"}
                          </span>
                        </div>
                        <CardTitle className="text-lg leading-tight">
                          {ad.title || "Untitled Ad"}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ad.description && (
                      <p className="text-sm text-slate-600 line-clamp-2">{ad.description}</p>
                    )}

                    <div className="space-y-2 text-xs">
         
                      <div className="flex items-start gap-2">
                        <span className="text-slate-500 font-medium min-w-[60px]">Slot ID:</span>
                        <code className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded flex-1 break-all">
                          {ad.adSlotId}
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleEdit(ad)}
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                      >
                        <Pencil className="w-3.5 h-3.5 mr-1.5" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => setDeleteAdId(ad._id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              {editingId ? (
                <>
                  <Pencil className="w-5 h-5" />
                  Edit Ad
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create New Ad
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update your ad configuration below"
                : "Fill in the details to create a new ad placement"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium">
                Ad Type
              </Label>
              <Select value={type} onValueChange={(val) => setType(val as "hero" | "body")}>
                <SelectTrigger id="type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">
                    <span className="flex items-center gap-2">🎯 Hero Ad</span>
                  </SelectItem>
                  <SelectItem value="body">
                    <span className="flex items-center gap-2">📄 Body Ad</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

   

            <div className="space-y-2">
              <Label htmlFor="adSlotId" className="text-sm font-medium">
                Ad Slot ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="adSlotId"
                placeholder="1234567890"
                value={adSlotId}
                onChange={(e: any) => setAdSlotId(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title <span className="text-slate-400 font-normal">(Optional)</span>
              </Label>
              <Input
                id="title"
                placeholder="Ad title or label"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-slate-400 font-normal">(Optional)</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Brief description or notes about this ad"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={closeModal} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              {editingId ? "Update Ad" : "Create Ad"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteAdId} onOpenChange={() => setDeleteAdId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the ad placement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}