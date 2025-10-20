import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cities, experienceRanges, feeRanges, consultationModes } from "@/data/therapists";

export interface Filters {
  cities: string[];
  experienceRange: string;
  genders: string[];
  feeRange: string;
  consultationModes: string[];
}

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  therapistCounts: {
    cities: Record<string, number>;
    genders: Record<string, number>;
  };
  onClose?: () => void;
  isMobile?: boolean;
}

export const FilterPanel = ({
  filters,
  onFiltersChange,
  therapistCounts,
  onClose,
  isMobile,
}: FilterPanelProps) => {
  const handleCityToggle = (city: string) => {
    const newCities = filters.cities.includes(city)
      ? filters.cities.filter((c) => c !== city)
      : [...filters.cities, city];
    onFiltersChange({ ...filters, cities: newCities });
  };

  const handleGenderToggle = (gender: string) => {
    const newGenders = filters.genders.includes(gender)
      ? filters.genders.filter((g) => g !== gender)
      : [...filters.genders, gender];
    onFiltersChange({ ...filters, genders: newGenders });
  };

  const handleModeToggle = (mode: string) => {
    const newModes = filters.consultationModes.includes(mode)
      ? filters.consultationModes.filter((m) => m !== mode)
      : [...filters.consultationModes, mode];
    onFiltersChange({ ...filters, consultationModes: newModes });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      cities: [],
      experienceRange: '',
      genders: [],
      feeRange: '',
      consultationModes: [],
    });
  };

  const hasActiveFilters =
    filters.cities.length > 0 ||
    filters.experienceRange ||
    filters.genders.length > 0 ||
    filters.feeRange ||
    filters.consultationModes.length > 0;

  return (
    <div className="h-full bg-card rounded-lg border p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* City Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">City</h3>
        <div className="space-y-2">
          {cities.map((city) => (
            <div key={city} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`city-${city}`}
                  checked={filters.cities.includes(city)}
                  onCheckedChange={() => handleCityToggle(city)}
                />
                <Label
                  htmlFor={`city-${city}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {city}
                </Label>
              </div>
              <span className="text-sm text-muted-foreground">
                ({therapistCounts.cities[city] || 0})
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Experience Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Experience</h3>
        <RadioGroup
          value={filters.experienceRange}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, experienceRange: value })
          }
        >
          {experienceRanges.map((range) => (
            <div key={range} className="flex items-center space-x-2">
              <RadioGroupItem value={range} id={`exp-${range}`} />
              <Label
                htmlFor={`exp-${range}`}
                className="text-sm font-normal cursor-pointer"
              >
                {range}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator className="my-6" />

      {/* Gender Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Gender</h3>
        <div className="space-y-2">
          {['Male', 'Female'].map((gender) => (
            <div key={gender} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`gender-${gender}`}
                  checked={filters.genders.includes(gender)}
                  onCheckedChange={() => handleGenderToggle(gender)}
                />
                <Label
                  htmlFor={`gender-${gender}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {gender}
                </Label>
              </div>
              <span className="text-sm text-muted-foreground">
                ({therapistCounts.genders[gender] || 0})
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Fee Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Fee Range</h3>
        <RadioGroup
          value={filters.feeRange}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, feeRange: value })
          }
        >
          {feeRanges.map((range) => (
            <div key={range} className="flex items-center space-x-2">
              <RadioGroupItem value={range} id={`fee-${range}`} />
              <Label
                htmlFor={`fee-${range}`}
                className="text-sm font-normal cursor-pointer"
              >
                {range}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator className="my-6" />

      {/* Consultation Mode Filter */}
      <div>
        <h3 className="font-medium mb-3">Consultation Mode</h3>
        <div className="space-y-2">
          {consultationModes.map((mode) => (
            <div key={mode} className="flex items-center space-x-2">
              <Checkbox
                id={`mode-${mode}`}
                checked={filters.consultationModes.includes(mode)}
                onCheckedChange={() => handleModeToggle(mode)}
              />
              <Label
                htmlFor={`mode-${mode}`}
                className="text-sm font-normal cursor-pointer"
              >
                {mode}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
