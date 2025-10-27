import { Grid, GridItem } from "./Grid";

// Example usage component
export default function GridExample() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Grid Component Examples</h1>
      
      {/* Basic Grid */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Basic Responsive Grid</h2>
        <Grid cols={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-blue-500 text-white p-6 rounded-lg">
              Item {i + 1}
            </div>
          ))}
        </Grid>
      </section>

      {/* Grid with Spanning Items */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Grid with Spanning Items</h2>
        <Grid cols={{ xs: 1, md: 4 }} gap={4}>
          <GridItem colSpan={{ xs: 1, md: 2 }} rowSpan={2}>
            <div className="bg-purple-500 text-white p-6 rounded-lg h-full">
              Large Item (2x2)
            </div>
          </GridItem>
          <GridItem colSpan={{ xs: 1, md: 2 }} rowSpan={2}>
            <div className="bg-green-500 text-white p-6 rounded-lg h-full">Item 2</div>
          </GridItem>
          <GridItem>
            <div className="bg-green-500 text-white p-6 rounded-lg">Item 3</div>
          </GridItem>
          <GridItem colSpan={{ xs: 1, md: 2 }} rowSpan={2}>
            <div className="bg-orange-500 text-white p-6 rounded-lg h-full">
              Wide Item (2x2)
            </div>
          </GridItem>
          <GridItem>
            <div className="bg-green-500 text-white p-6 rounded-lg">Item 5</div>
          </GridItem>
          <GridItem>
            <div className="bg-green-500 text-white p-6 rounded-lg">Item 6</div>
          </GridItem>
        </Grid>
      </section>

      {/* Custom Gap */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Custom Row and Column Gap</h2>
        <Grid cols={3} rowGap={8} colGap={4}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-pink-500 text-white p-6 rounded-lg">
              Item {i + 1}
            </div>
          ))}
        </Grid>
      </section>

      {/* Auto Flow */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Dense Auto Flow</h2>
        <Grid cols={4} gap={4} autoFlow="dense">
          <GridItem colSpan={2}>
            <div className="bg-indigo-500 text-white p-6 rounded-lg">Wide</div>
          </GridItem>
          <GridItem>
            <div className="bg-teal-500 text-white p-6 rounded-lg">1</div>
          </GridItem>
          <GridItem>
            <div className="bg-teal-500 text-white p-6 rounded-lg">2</div>
          </GridItem>
          <GridItem>
            <div className="bg-teal-500 text-white p-6 rounded-lg">3</div>
          </GridItem>
          <GridItem colSpan={2}>
            <div className="bg-indigo-500 text-white p-6 rounded-lg">Wide</div>
          </GridItem>
          <GridItem>
            <div className="bg-teal-500 text-white p-6 rounded-lg">4</div>
          </GridItem>
        </Grid>
      </section>
    </div>
  );
}