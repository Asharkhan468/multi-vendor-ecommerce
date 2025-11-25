// "use client";

// import { Home, ShoppingCart, Archive, Box } from "lucide-react";

// export default function Sidebar({ activeTab, setActiveTab }:any) {
//   const tabs = [
//     { name: "Home", icon: Home },
//     { name: "Orders", icon: ShoppingCart },
//     { name: "Order Status", icon: Archive },
//     { name: "Inventory", icon: Box },
//   ];

//   return (
//     <aside className="w-64 bg-indigo-600 text-white flex flex-col">
//       <h1 className="text-2xl font-bold p-6 border-b border-indigo-500">Vendor Panel</h1>
//       <nav className="flex-1 p-4 space-y-4">
//         {tabs.map((tab) => {
//           const Icon = tab.icon;
//           return (
//             <button
//               key={tab.name}
//               onClick={() => setActiveTab(tab.name)}
//               className={`w-full text-left flex items-center gap-3 p-3 rounded hover:bg-indigo-500 transition-colors ${
//                 activeTab === tab.name ? "bg-indigo-700" : ""
//               }`}
//             >
//               <Icon className="w-5 h-5" />
//               <span>{tab.name}</span>
//             </button>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }


"use client";

import { Home, ShoppingCart, Archive, Box, LogOut } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }: any) {
  const tabs = [
    { name: "Home", icon: Home },
    { name: "Orders", icon: ShoppingCart },
    { name: "Order Status", icon: Archive },
    { name: "Inventory", icon: Box },
  ];

  const handleLogout = () => {
    // yahan apna logout logic lagao (jaise token clear, redirect, etc.)
    console.log("User logged out");
  };

  return (
    <aside className="w-64 bg-indigo-600 text-white flex flex-col justify-between h-screen">
      {/* Top Section */}
      <div>
        <h1 className="text-2xl font-bold p-6 border-b border-indigo-500">
          Vendor Panel
        </h1>
        <nav className="p-4 space-y-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full text-left flex items-center gap-3 p-3 rounded hover:bg-indigo-500 transition-colors ${
                  activeTab === tab.name ? "bg-indigo-700" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button at Bottom */}
      <div className="p-4 border-t border-indigo-500">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
