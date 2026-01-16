import { onMounted, onUnmounted } from 'vue'

export const useBugCursor = () => {
  onMounted(() => {
    // Add global CSS to hide all cursors
    const style = document.createElement('style')
    style.textContent = `
      * {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)
    
    // Create bug cursor element
    const cursor = document.createElement('div')
    cursor.id = 'bug-cursor'
    cursor.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Bug body (oval) -->
        <ellipse cx="12" cy="13" rx="5" ry="7" fill="url(#bugGradient)" stroke="rgba(168,85,247,0.8)" stroke-width="1"/>
        
        <!-- Bug head -->
        <circle cx="12" cy="5" r="3.5" fill="url(#bugGradient)" stroke="rgba(168,85,247,0.8)" stroke-width="1"/>
        
        <!-- Eyes -->
        <circle cx="10.5" cy="4" r="1" fill="rgba(255,255,255,0.95)"/>
        <circle cx="13.5" cy="4" r="1" fill="rgba(255,255,255,0.95)"/>
        
        <!-- Left antenna -->
        <path d="M 10 3 Q 8 1 7 0.5" stroke="rgba(168,85,247,0.8)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        <circle cx="7" cy="0.5" r="0.8" fill="rgba(168,85,247,0.9)"/>
        
        <!-- Right antenna -->
        <path d="M 14 3 Q 16 1 17 0.5" stroke="rgba(168,85,247,0.8)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        <circle cx="17" cy="0.5" r="0.8" fill="rgba(168,85,247,0.9)"/>
        
        <!-- Left legs -->
        <path d="M 8 10 L 4 12" stroke="rgba(168,85,247,0.7)" stroke-width="1" stroke-linecap="round"/>
        <path d="M 8 13 L 3 15" stroke="rgba(168,85,247,0.7)" stroke-width="1" stroke-linecap="round"/>
        <path d="M 8 16 L 4 19" stroke="rgba(168,85,247,0.7)" stroke-width="1" stroke-linecap="round"/>
        
        <!-- Right legs -->
        <path d="M 16 10 L 20 12" stroke="rgba(168,85,247,0.7)" stroke-width="1" stroke-linecap="round"/>
        <path d="M 16 13 L 21 15" stroke="rgba(168,85,247,0.7)" stroke-width="1" stroke-linecap="round"/>
        <path d="M 16 16 L 20 19" stroke="rgba(168,85,247,0.7)" stroke-width="1" stroke-linecap="round"/>
        
        <!-- Gradient definition -->
        <defs>
          <radialGradient id="bugGradient">
            <stop offset="0%" stop-color="rgba(168,85,247,1)" />
            <stop offset="100%" stop-color="rgba(59,130,246,0.9)" />
          </radialGradient>
        </defs>
      </svg>
    `
    
    cursor.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      left: 0;
      top: 0;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 8px rgba(168,85,247,0.6)) drop-shadow(0 0 4px rgba(59,130,246,0.4));
      transition: transform 0.05s ease-out;
    `
    
    document.body.appendChild(cursor)
    document.body.style.cursor = 'none'
    
    // Track mouse movement
    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 24}px, ${e.clientY - 24}px)`
    }
    
    document.addEventListener('mousemove', moveCursor)
    
    // Show/hide bug cursor on window leave/enter
    document.addEventListener('mouseleave', () => {
      cursor.style.display = 'none'
    })
    
    document.addEventListener('mouseenter', () => {
      cursor.style.display = 'flex'
    })
    
    onUnmounted(() => {
      document.removeEventListener('mousemove', moveCursor)
      document.body.style.cursor = 'auto'
      document.head.removeChild(style)
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor)
      }
    })
  })
}
