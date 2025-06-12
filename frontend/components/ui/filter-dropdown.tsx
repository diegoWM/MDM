import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "./button"

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterDropdownProps {
  options: FilterOption[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function FilterDropdown({
  options,
  value,
  onValueChange,
  placeholder = "Select option",
  className,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between bg-white hover:bg-gray-50"
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors",
                value === option.value && "bg-primary/5 text-primary"
              )}
              onClick={() => {
                onValueChange(option.value)
                setIsOpen(false)
              }}
            >
              <div className="flex items-center space-x-2">
                <span>{option.label}</span>
                {option.count !== undefined && (
                  <span className="text-xs text-muted-foreground">({option.count})</span>
                )}
              </div>
              {value === option.value && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}