import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    label: string
    isPositive?: boolean
  }
  variant?: 'default' | 'success' | 'warning' | 'info'
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, title, value, description, icon: Icon, trend, variant = 'default', ...props }, ref) => {
    const variantStyles = {
      default: 'border-gray-200 bg-white',
      success: 'border-green-200 bg-green-50',
      warning: 'border-yellow-200 bg-yellow-50',
      info: 'border-blue-200 bg-blue-50',
    }

    const iconStyles = {
      default: 'text-gray-600',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      info: 'text-blue-600',
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {trend && (
              <div className="flex items-center space-x-1">
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">{trend.label}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn("rounded-lg p-3", iconStyles[variant])}>
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
      </div>
    )
  }
)
StatsCard.displayName = "StatsCard"

export { StatsCard }