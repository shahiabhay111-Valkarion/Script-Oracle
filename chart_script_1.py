import plotly.graph_objects as go
import plotly.express as px
import json
import pandas as pd

# Redesigned layout with better spacing
data = {
  "components": [
    # Presentation Layer - more spread out
    {"name": "PyQt5 GUI", "layer": "presentation", "x": 15, "y": 10, "type": "interface"},
    {"name": "Promo Widget", "layer": "presentation", "x": 35, "y": 10, "type": "interface"},
    {"name": "Admin Panel", "layer": "presentation", "x": 55, "y": 10, "type": "interface"},
    {"name": "Tier Badge", "layer": "presentation", "x": 75, "y": 10, "type": "interface"},
    
    # Orchestration Layer - central hub with better spacing
    {"name": "Data Flow Manager", "layer": "orchestration", "x": 45, "y": 28, "type": "core"},
    {"name": "Critical Queue", "layer": "orchestration", "x": 15, "y": 32, "type": "queue"},
    {"name": "High Queue", "layer": "orchestration", "x": 30, "y": 32, "type": "queue"},
    {"name": "Normal Queue", "layer": "orchestration", "x": 60, "y": 32, "type": "queue"},
    
    # Services Layer - better distributed
    {"name": "Hybrid Engine", "layer": "services", "x": 15, "y": 50, "type": "service"},
    {"name": "XGBoost", "layer": "services", "x": 8, "y": 58, "type": "ml"},
    {"name": "PyTorch", "layer": "services", "x": 15, "y": 58, "type": "ml"},
    {"name": "DeepSeek-R1", "layer": "services", "x": 22, "y": 58, "type": "ml"},
    
    {"name": "Payment Gateway", "layer": "services", "x": 35, "y": 50, "type": "service"},
    {"name": "Promo Generator", "layer": "services", "x": 55, "y": 50, "type": "service"},
    {"name": "Encryption Layer", "layer": "services", "x": 75, "y": 50, "type": "service"},
    
    # Backend Layer
    {"name": "Supabase Client", "layer": "backend", "x": 25, "y": 72, "type": "database"},
    {"name": "Analytics Engine", "layer": "backend", "x": 45, "y": 72, "type": "database"},
    {"name": "Usage Tracker", "layer": "backend", "x": 65, "y": 72, "type": "database"},
    
    # External APIs
    {"name": "OpenRouter API", "layer": "external", "x": 15, "y": 90, "type": "api"},
    {"name": "PayPal API", "layer": "external", "x": 35, "y": 90, "type": "api"},
    {"name": "Google AdSense", "layer": "external", "x": 55, "y": 90, "type": "api"},
    {"name": "Supabase DB", "layer": "external", "x": 75, "y": 90, "type": "api"}
  ],
  "data_flows": [
    {"from": "PyQt5 GUI", "to": "Data Flow Manager", "type": "User Action", "color": "#1FB8CD"},
    {"from": "Promo Widget", "to": "Data Flow Manager", "type": "Promo Event", "color": "#944454"},
    {"from": "Admin Panel", "to": "Data Flow Manager", "type": "User Action", "color": "#1FB8CD"},
    {"from": "Data Flow Manager", "to": "Hybrid Engine", "type": "ML Request", "color": "#2E8B57"},
    {"from": "Data Flow Manager", "to": "Payment Gateway", "type": "Payment Event", "color": "#D2BA4C"},
    {"from": "Data Flow Manager", "to": "Promo Generator", "type": "Promo Event", "color": "#944454"},
    {"from": "Hybrid Engine", "to": "Data Flow Manager", "type": "ML Result", "color": "#2E8B57"},
    {"from": "Payment Gateway", "to": "Data Flow Manager", "type": "Payment Event", "color": "#D2BA4C"},
    {"from": "Data Flow Manager", "to": "Critical Queue", "type": "System Event", "color": "#DB4545"},
    {"from": "Data Flow Manager", "to": "High Queue", "type": "System Event", "color": "#DB4545"},
    {"from": "Data Flow Manager", "to": "Normal Queue", "type": "System Event", "color": "#DB4545"},
    {"from": "Data Flow Manager", "to": "Supabase Client", "type": "System Event", "color": "#DB4545"},
    {"from": "Encryption Layer", "to": "Supabase Client", "type": "System Event", "color": "#DB4545"},
    {"from": "Supabase Client", "to": "Supabase DB", "type": "System Event", "color": "#DB4545"},
    {"from": "Hybrid Engine", "to": "OpenRouter API", "type": "ML Result", "color": "#2E8B57"},
    {"from": "Payment Gateway", "to": "PayPal API", "type": "Payment Event", "color": "#D2BA4C"}
  ],
  "layers": [
    {"name": "Presentation", "y": 10, "color": "#4A90E2"},
    {"name": "Orchestration", "y": 30, "color": "#28A745"},
    {"name": "Services", "y": 54, "color": "#FFC107"},
    {"name": "Backend", "y": 72, "color": "#17A2B8"},
    {"name": "External API", "y": 90, "color": "#6C757D"}
  ]
}

# Create the figure
fig = go.Figure()

# Add layer backgrounds with better visibility
for i, layer in enumerate(data["layers"]):
    fig.add_shape(
        type="rect",
        x0=0, x1=90, y0=layer["y"]-8, y1=layer["y"]+8,
        fillcolor=layer["color"],
        opacity=0.15,
        line=dict(color=layer["color"], width=1.5)
    )
    
    # Add layer labels on the left
    fig.add_annotation(
        x=-2, y=layer["y"],
        text=f"<b>{layer['name']}</b>",
        showarrow=False,
        font=dict(size=12, color=layer["color"]),
        xanchor="right",
        textangle=0
    )

# Create component lookup for coordinates
comp_lookup = {comp["name"]: comp for comp in data["components"]}

# Add connection lines with better routing
flow_types = {}
for flow in data["data_flows"]:
    flow_type = flow["type"]
    if flow_type not in flow_types:
        flow_types[flow_type] = []
    flow_types[flow_type].append(flow)

# Draw connections grouped by type for cleaner lines
for flow_type, flows in flow_types.items():
    x_coords = []
    y_coords = []
    
    for flow in flows:
        from_comp = comp_lookup[flow["from"]]
        to_comp = comp_lookup[flow["to"]]
        
        # Add some curve to avoid overlapping lines
        if abs(from_comp["x"] - to_comp["x"]) > 20:
            mid_x = (from_comp["x"] + to_comp["x"]) / 2
            mid_y = (from_comp["y"] + to_comp["y"]) / 2
            x_coords.extend([from_comp["x"], mid_x, to_comp["x"], None])
            y_coords.extend([from_comp["y"], mid_y - 2, to_comp["y"], None])
        else:
            x_coords.extend([from_comp["x"], to_comp["x"], None])
            y_coords.extend([from_comp["y"], to_comp["y"], None])
        
        # Add arrow at the end
        fig.add_annotation(
            x=to_comp["x"], y=to_comp["y"],
            ax=from_comp["x"], ay=from_comp["y"],
            arrowhead=2, arrowsize=1.5, arrowwidth=3,
            arrowcolor=flow["color"],
            showarrow=True,
            axref="x", ayref="y"
        )
    
    # Add the flow type to legend
    fig.add_trace(go.Scatter(
        x=x_coords,
        y=y_coords,
        mode="lines",
        line=dict(color=flows[0]["color"], width=3),
        name=flow_type,
        hoverinfo="name",
        showlegend=True
    ))

# Define node colors and symbols by type
type_colors = {
    "interface": "#1FB8CD",
    "core": "#DB4545", 
    "queue": "#2E8B57",
    "service": "#5D878F",
    "ml": "#D2BA4C",
    "database": "#B4413C",
    "api": "#964325"
}

type_symbols = {
    "interface": "square",
    "core": "diamond",
    "queue": "triangle-up", 
    "service": "circle",
    "ml": "hexagon",
    "database": "pentagon",
    "api": "star"
}

# Add components grouped by type
for comp_type in type_colors.keys():
    comp_of_type = [comp for comp in data["components"] if comp["type"] == comp_type]
    if comp_of_type:
        fig.add_trace(go.Scatter(
            x=[comp["x"] for comp in comp_of_type],
            y=[comp["y"] for comp in comp_of_type],
            mode="markers+text",
            marker=dict(
                symbol=type_symbols[comp_type],
                size=18,
                color=type_colors[comp_type],
                line=dict(width=2, color="white")
            ),
            text=[comp["name"] for comp in comp_of_type],  # Show full names
            textposition="bottom center",
            textfont=dict(size=9, color="black"),
            name=f"{comp_type.title()} Node",
            hovertemplate="<b>%{text}</b><br>Type: " + comp_type + "<extra></extra>",
            showlegend=False  # Don't show in legend to avoid clutter
        ))

# Update layout
fig.update_layout(
    title="Script Oracle Integration Flow",
    xaxis=dict(
        range=[-8, 95],
        showgrid=False,
        showticklabels=False,
        zeroline=False
    ),
    yaxis=dict(
        range=[0, 105],
        showgrid=False,
        showticklabels=False,
        zeroline=False,
        autorange="reversed"
    ),
    showlegend=True,
    legend=dict(
        title="Data Flow Types",
        orientation='v',
        yanchor='top',
        y=1,
        xanchor='left',
        x=1.02
    ),
    plot_bgcolor="white"
)

fig.update_traces(cliponaxis=False)

# Save the chart
fig.write_image("system_integration_flow.png", width=1400, height=900, scale=2)