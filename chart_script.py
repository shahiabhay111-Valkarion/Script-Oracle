import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import numpy as np

# Improved components data with better spacing and alignment
components_data = [
    # Top level: PyQt5 GUI Sanctum with specific interface panels - evenly spaced
    {"name": "Upload File", "level": 1, "category": "GUI", "x": 10, "y": 15},
    {"name": "Optimize Script", "level": 1, "category": "GUI", "x": 25, "y": 15},
    {"name": "Cleanse Import", "level": 1, "category": "GUI", "x": 40, "y": 15},
    {"name": "Inspect Vars", "level": 1, "category": "GUI", "x": 55, "y": 15},
    {"name": "Explain Fix", "level": 1, "category": "GUI", "x": 70, "y": 15},
    {"name": "Tier Badges", "level": 1, "category": "GUI", "x": 85, "y": 15},
    
    # Middle tier: Core Application Logic - better spaced
    {"name": "Hybrid Engine", "level": 2, "category": "Core", "x": 20, "y": 35},
    {"name": "Payment Gate", "level": 2, "category": "Core", "x": 40, "y": 35},
    {"name": "Promo Gen", "level": 2, "category": "Core", "x": 60, "y": 35},
    {"name": "Auth & Tier", "level": 2, "category": "Core", "x": 80, "y": 35},
    
    # Sub-components of core logic - aligned properly
    {"name": "XGBoost", "level": 3, "category": "ML", "x": 15, "y": 50},
    {"name": "PyTorch", "level": 3, "category": "ML", "x": 30, "y": 50},
    {"name": "DeepSeek-R1", "level": 3, "category": "ML", "x": 45, "y": 50},
    {"name": "PayPal API", "level": 3, "category": "Payment", "x": 60, "y": 50},
    {"name": "AdSense", "level": 3, "category": "Ads", "x": 75, "y": 50},
    
    # Backend Services - centered and spaced
    {"name": "Supabase DB", "level": 4, "category": "Backend", "x": 25, "y": 70},
    {"name": "OpenRouter", "level": 4, "category": "Backend", "x": 50, "y": 70},
    {"name": "Security", "level": 4, "category": "Security", "x": 75, "y": 70},
    
    # External Deployment - aligned
    {"name": "GitHub Repo", "level": 5, "category": "Deployment", "x": 25, "y": 85},
    {"name": "Vercel", "level": 5, "category": "Deployment", "x": 50, "y": 85},
    {"name": "Custom Domain", "level": 5, "category": "Deployment", "x": 75, "y": 85}
]

# Simplified connections to reduce clutter
connections_data = [
    {"from": "Upload File", "to": "Hybrid Engine", "type": "Input"},
    {"from": "Optimize Script", "to": "Hybrid Engine", "type": "Process"},
    {"from": "Tier Badges", "to": "Auth & Tier", "type": "Auth"},
    {"from": "Hybrid Engine", "to": "XGBoost", "type": "ML"},
    {"from": "Hybrid Engine", "to": "PyTorch", "type": "ML"},
    {"from": "Hybrid Engine", "to": "DeepSeek-R1", "type": "AI"},
    {"from": "Payment Gate", "to": "PayPal API", "type": "Pay"},
    {"from": "Auth & Tier", "to": "Supabase DB", "type": "Data"},
    {"from": "DeepSeek-R1", "to": "OpenRouter", "type": "API"},
    {"from": "GitHub Repo", "to": "Vercel", "type": "Deploy"},
    {"from": "Vercel", "to": "Custom Domain", "type": "Route"}
]

# Convert to DataFrame
df_components = pd.DataFrame(components_data)

# Create color mapping for categories
color_map = {
    'GUI': '#1FB8CD',
    'Core': '#DB4545',
    'ML': '#2E8B57',
    'Payment': '#5D878F',
    'Ads': '#D2BA4C',
    'Backend': '#B4413C',
    'Security': '#964325',
    'Deployment': '#944454'
}

# Create the figure
fig = go.Figure()

# Add layer background rectangles with better styling
layer_info = [
    {"name": "GUI Layer", "y_start": 5, "y_end": 25, "color": "rgba(31, 184, 205, 0.15)"},
    {"name": "Core Logic", "y_start": 25, "y_end": 45, "color": "rgba(219, 69, 69, 0.15)"},
    {"name": "Services", "y_start": 45, "y_end": 60, "color": "rgba(46, 139, 87, 0.15)"},
    {"name": "Backend", "y_start": 60, "y_end": 80, "color": "rgba(180, 65, 60, 0.15)"},
    {"name": "Deployment", "y_start": 80, "y_end": 95, "color": "rgba(148, 68, 84, 0.15)"}
]

for layer in layer_info:
    fig.add_shape(
        type="rect",
        x0=5, y0=layer["y_start"],
        x1=95, y1=layer["y_end"],
        fillcolor=layer["color"],
        line=dict(color="lightgray", width=2),
        layer="below"
    )

# Add layer labels horizontally positioned outside the chart
fig.add_annotation(x=-2, y=15, text="GUI Layer", showarrow=False, 
                  font=dict(size=14, color='#1FB8CD', family="Arial Black"), textangle=0)
fig.add_annotation(x=-2, y=35, text="Core Logic", showarrow=False, 
                  font=dict(size=14, color='#DB4545', family="Arial Black"), textangle=0)
fig.add_annotation(x=-2, y=50, text="Services", showarrow=False, 
                  font=dict(size=14, color='#2E8B57', family="Arial Black"), textangle=0)
fig.add_annotation(x=-2, y=70, text="Backend", showarrow=False, 
                  font=dict(size=14, color='#B4413C', family="Arial Black"), textangle=0)
fig.add_annotation(x=-2, y=85, text="Deployment", showarrow=False, 
                  font=dict(size=14, color='#944454', family="Arial Black"), textangle=0)

# Add connections with better visibility
component_lookup = {comp['name']: (comp['x'], comp['y']) for comp in components_data}

for i, conn in enumerate(connections_data):
    from_pos = component_lookup.get(conn['from'])
    to_pos = component_lookup.get(conn['to'])
    
    if from_pos and to_pos:
        # Add connection line with better styling
        fig.add_trace(go.Scatter(
            x=[from_pos[0], to_pos[0]],
            y=[from_pos[1], to_pos[1]],
            mode='lines',
            line=dict(color='gray', width=2),
            showlegend=False,
            hovertemplate=f'<b>{conn["type"]}</b><br>{conn["from"]} → {conn["to"]}<extra></extra>',
            name=f'Flow_{i+1}'
        ))
        
        # Add arrow with better positioning
        fig.add_annotation(
            x=to_pos[0],
            y=to_pos[1],
            ax=from_pos[0],
            ay=from_pos[1],
            xref='x', yref='y',
            axref='x', ayref='y',
            arrowhead=2,
            arrowsize=2,
            arrowwidth=3,
            arrowcolor='gray',
            showarrow=True
        )

# Add components with improved styling and larger text
categories = df_components['category'].unique()
for category in categories:
    category_data = df_components[df_components['category'] == category]
    
    fig.add_trace(go.Scatter(
        x=category_data['x'],
        y=category_data['y'],
        mode='markers+text',
        marker=dict(
            size=30,
            color=color_map.get(category, '#1FB8CD'),
            line=dict(width=3, color='white'),
            symbol='square'
        ),
        text=category_data['name'],
        textposition='middle center',
        textfont=dict(size=10, color='white', family="Arial Black"),
        name=category,
        hovertemplate='<b>%{text}</b><br>Category: ' + category + '<extra></extra>'
    ))

# Update layout with improved legend
fig.update_layout(
    title=dict(
        text="Script Oracle Architecture",
        font=dict(size=20, family="Arial Black")
    ),
    xaxis=dict(
        showgrid=False,
        showticklabels=False,
        zeroline=False,
        range=[-8, 102]
    ),
    yaxis=dict(
        showgrid=False,
        showticklabels=False,
        zeroline=False,
        range=[0, 100],
        autorange='reversed'
    ),
    showlegend=True,
    legend=dict(
        orientation='v',
        yanchor='top',
        y=0.95,
        xanchor='left',
        x=1.02,
        font=dict(size=12)
    ),
    plot_bgcolor='white',
    paper_bgcolor='white',
    font=dict(family="Arial")
)

fig.update_traces(cliponaxis=False)

# Save the chart with better dimensions
fig.write_image("architecture_diagram.png", width=1600, height=900)