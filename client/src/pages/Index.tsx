import { useState, useEffect, useMemo } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Header } from "@/components/Header";
import { FilterPanel, Filters } from "@/components/FilterPanel";
import { TherapistCard } from "@/components/TherapistCard";
import { TherapistDetailModal } from "@/components/TherapistDetailModal";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTherapists } from "@/hooks/useTherapists";
import { useFilters } from "@/hooks/useFilters";
import { Therapist } from "@/services/api";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    cities: [],
    experienceRange: "",
    genders: [],
    feeRange: "",
    consultationModes: [],
  });
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Use the API hooks
  const { therapists, loading, error, pagination, searchTherapists } = useTherapists({
    page: 1,
    limit: 12,
    sortBy: 'name',
    sortOrder: 'asc',
  });
  const { filterOptions, loading: filtersLoading } = useFilters();

  // Convert filters to API format
  const apiFilters = useMemo(() => {
    const consultationModes = filters.consultationModes.map(mode => {
      if (mode === "In-person") return "In-person";
      if (mode === "Online") return "Virtual telephonic";
      return mode;
    });

    return {
      cities: filters.cities.length > 0 ? filters.cities : undefined,
      experienceRange: filters.experienceRange || undefined,
      genders: filters.genders.length > 0 ? filters.genders : undefined,
      feeRange: filters.feeRange || undefined,
      consultationModes: consultationModes.length > 0 ? consultationModes : undefined,
      q: searchQuery || undefined,
      page: currentPage,
      limit: 12,
      ...(sortBy
        ? {
            sortBy: sortBy === "experience" ? "experienceYears" : "fees",
            sortOrder: (sortBy === "fee-high" || sortBy === "experience") ? "desc" : "asc" as "asc" | "desc",
          }
        : {}),
    };
  }, [filters, searchQuery, currentPage, sortBy]);

  // Search therapists when filters change
  useEffect(() => {
    searchTherapists(apiFilters);
  }, [apiFilters, searchTherapists]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, sortBy]);

  // Calculate counts for filters from API data
  const therapistCounts = useMemo(() => {
    if (!filterOptions) return { cities: {}, genders: {} };
    
    const cities: Record<string, number> = {};
    const genders: Record<string, number> = {};

    filterOptions.cities.forEach(city => {
      cities[city.value] = city.count;
    });

    filterOptions.genders.forEach(gender => {
      genders[gender.value] = gender.count;
    });

    return { cities, genders };
  }, [filterOptions]);

  const handleViewDetails = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  };

  const activeFilterCount = [
    filters.cities.length,
    filters.experienceRange ? 1 : 0,
    filters.genders.length,
    filters.feeRange ? 1 : 0,
    filters.consultationModes.length,
  ].reduce((a, b) => a + b, 0);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading therapists...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-destructive/10 mx-auto mb-4 flex items-center justify-center">
              <Filter className="w-10 h-10 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Error loading therapists</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filter Panel */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                therapistCounts={therapistCounts}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  {(() => {
                    if (!pagination) {
                      return `Showing ${therapists.length} of ${therapists.length} therapists`;
                    }
                    const shown = Math.min(pagination.currentPage * pagination.limit, pagination.totalCount);
                    return `Showing ${shown} of ${pagination.totalCount} therapists`;
                  })()}
                </h2>
                {activeFilterCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""}{" "}
                    applied
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                      {activeFilterCount > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                          {activeFilterCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <FilterPanel
                      filters={filters}
                      onFiltersChange={setFilters}
                      therapistCounts={therapistCounts}
                      onClose={() => setMobileFilterOpen(false)}
                      isMobile
                    />
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(value) => setSortBy(value === "clear" ? undefined : value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clear">Clear Sort</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="fee-low">Fee: Low to High</SelectItem>
                    <SelectItem value="fee-high">Fee: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Therapist Grid */}
            {therapists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                {therapists.map((therapist) => (
                  <TherapistCard
                    key={therapist.id}
                    therapist={therapist}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Filter className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No therapists found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={() => {
                    setFilters({
                      cities: [],
                      experienceRange: "",
                      genders: [],
                      feeRange: "",
                      consultationModes: [],
                    });
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  variant="outline"
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.hasPrevPage) {
                            setCurrentPage((p) => Math.max(1, p - 1));
                          }
                        }}
                        aria-disabled={!pagination.hasPrevPage}
                        className={!pagination.hasPrevPage ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {(() => {
                      const items = [] as JSX.Element[];
                      const total = pagination.totalPages;
                      const current = pagination.currentPage;
                      const windowSize = 5; // number of page links to show around current
                      const start = Math.max(1, current - Math.floor(windowSize / 2));
                      const end = Math.min(total, start + windowSize - 1);
                      const adjustedStart = Math.max(1, Math.min(start, end - windowSize + 1));

                      // First page
                      if (adjustedStart > 1) {
                        items.push(
                          <PaginationItem key={1}>
                            <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(1); }}>
                              1
                            </PaginationLink>
                          </PaginationItem>
                        );
                        if (adjustedStart > 2) {
                          items.push(<PaginationItem key="start-ellipsis"><span className="px-2">...</span></PaginationItem>);
                        }
                      }

                      // Window pages
                      for (let p = adjustedStart; p <= end; p++) {
                        items.push(
                          <PaginationItem key={p}>
                            <PaginationLink href="#" isActive={p === current} onClick={(e) => { e.preventDefault(); setCurrentPage(p); }}>
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      // Last page
                      if (end < total) {
                        if (end < total - 1) {
                          items.push(<PaginationItem key="end-ellipsis"><span className="px-2">...</span></PaginationItem>);
                        }
                        items.push(
                          <PaginationItem key={total}>
                            <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(total); }}>
                              {total}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      return items;
                    })()}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.hasNextPage) {
                            setCurrentPage((p) => Math.min(pagination.totalPages, p + 1));
                          }
                        }}
                        aria-disabled={!pagination.hasNextPage}
                        className={!pagination.hasNextPage ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Therapist Detail Modal */}
      <TherapistDetailModal
        therapist={selectedTherapist}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
