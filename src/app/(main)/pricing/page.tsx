import { DashboardShell } from "@/components/dashboard-shell";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
	return (
		<DashboardShell
			title="Pricing Plans"
			description="Choose the perfect diagnostic package for your needs"
			icon="creditCard"
		>
			<div className="space-y-8">
				<PricingCards />

				<div className="text-center">
					<p className="text-muted-foreground">
						Need a custom package?{" "}
						<Button variant="link" className="text-blue-600">
							Contact us
						</Button>
					</p>
				</div>
			</div>
		</DashboardShell>
	);
}
