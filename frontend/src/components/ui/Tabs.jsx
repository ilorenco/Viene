import * as TabsPrimitive from '@radix-ui/react-tabs'

export function Tabs(props) {
    return <TabsPrimitive.Root {...props} />
}

export function TabsList({ options }) {
    return (
        <TabsPrimitive.List className="bg-secondary text-background flex overflow-hidden rounded-lg">
            {options.map((option) => (
                <TabsPrimitive.Trigger
                    key={option.value}
                    value={option.value}
                    className="group flex flex-1 flex-col items-center gap-2 pt-2"
                >
                    <span className="text-2xl">{option.label}</span>
                    <span
                        aria-hidden="true"
                        className="group-data-[state=active]:bg-primary h-2 w-full rounded-full bg-transparent"
                    />
                </TabsPrimitive.Trigger>
            ))}
        </TabsPrimitive.List>
    )
}

export function TabsContent(props) {
    return <TabsPrimitive.Content {...props} />
}
