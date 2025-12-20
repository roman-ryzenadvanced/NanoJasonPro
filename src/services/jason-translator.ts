// Jason Language Translator - Offline-only version
// Converts natural language to Jason format for universal AI compatibility

export interface JasonFormat {
  jason_text: string
  style: string
  mood: string
  characters: string[]
  items: string[]
  setting?: string
  action?: string
  color_palette?: string[]
  composition?: string
  lighting?: string
  quality?: string
}

export class JasonTranslator {
  // Style detection patterns
  private stylePatterns = {
    realistic: ['photo', 'realistic', 'photograph', 'lifelike', 'real', 'actual'],
    anime: ['anime', 'manga', 'japanese', 'studio ghibli', 'akira', 'naruto'],
    fantasy: ['fantasy', 'magical', 'dragon', 'wizard', 'elf', 'fairy', 'mythical'],
    scifi: ['sci-fi', 'futuristic', 'cyberpunk', 'space', 'robot', 'alien', 'technology'],
    cartoon: ['cartoon', 'disney', 'pixar', 'animated', 'character', 'funny'],
    oil: ['oil painting', 'canvas', 'brushstrokes', 'classical', 'renaissance'],
    watercolor: ['watercolor', 'watercolor painting', 'soft', 'flowing', 'transparent'],
    pixel: ['pixel art', '8-bit', '16-bit', 'retro', 'pixelated', 'minecraft'],
    abstract: ['abstract', 'geometric', 'shapes', 'patterns', 'modern art'],
    vintage: ['vintage', 'retro', 'old', 'antique', 'classic', '1950s', '1960s'],
    minimal: ['minimal', 'simple', 'clean', 'minimalist', 'basic'],
    detailed: ['detailed', 'intricate', 'complex', 'elaborate', 'fine details']
  }

  // Mood detection patterns
  private moodPatterns = {
    happy: ['happy', 'joyful', 'cheerful', 'smiling', 'bright', 'sunny'],
    sad: ['sad', 'melancholy', 'somber', 'gloomy', 'depressed', 'tears'],
    epic: ['epic', 'dramatic', 'heroic', 'grand', 'massive', 'breathtaking'],
    peaceful: ['peaceful', 'calm', 'serene', 'tranquil', 'quiet', 'relaxing'],
    mysterious: ['mysterious', 'foggy', 'dark', 'hidden', 'secret', 'enigmatic'],
    energetic: ['energetic', 'dynamic', 'action', 'movement', 'fast', 'powerful'],
    romantic: ['romantic', 'love', 'heart', 'candlelight', 'intimate', 'passionate'],
    scary: ['scary', 'horror', 'creepy', 'dark', 'fear', 'terror']
  }

  // Character detection patterns
  private characterPatterns = [
    'person', 'man', 'woman', 'child', 'boy', 'girl', 'baby',
    'wizard', 'witch', 'dragon', 'knight', 'princess', 'king', 'queen',
    'robot', 'alien', 'cyborg', 'monster', 'ghost', 'vampire',
    'animal', 'cat', 'dog', 'bird', 'lion', 'tiger', 'elephant',
    'fairy', 'elf', 'dwarf', 'orc', 'angel', 'demon'
  ]

  // Item detection patterns
  private itemPatterns = [
    'sword', 'shield', 'armor', 'crown', 'wand', 'staff', 'book',
    'car', 'airplane', 'boat', 'ship', 'train', 'bicycle',
    'house', 'castle', 'building', 'tower', 'bridge', 'road',
    'tree', 'flower', 'mountain', 'river', 'lake', 'ocean',
    'computer', 'phone', 'tablet', 'camera', 'television', 'game',
    'food', 'pizza', 'cake', 'coffee', 'wine', 'fruit'
  ]

  async translateToJason(text: string): Promise<JasonFormat> {
    const lowerText = text.toLowerCase()
    
    return {
      jason_text: this.createJasonText(text),
      style: this.detectStyle(lowerText),
      mood: this.detectMood(lowerText),
      characters: this.detectCharacters(lowerText),
      items: this.detectItems(lowerText),
      setting: this.extractSetting(lowerText),
      action: this.extractAction(lowerText),
      color_palette: this.extractColors(lowerText),
      composition: this.extractComposition(lowerText),
      lighting: this.extractLighting(lowerText),
      quality: 'high'
    }
  }

  private createJasonText(text: string): string {
    const jasonStructure = {
      prompt: text,
      version: '1.0',
      type: 'image_generation',
      metadata: {
        created_by: 'NanoJason',
        timestamp: new Date().toISOString()
      }
    }
    
    return JSON.stringify(jasonStructure, null, 2)
  }

  private detectStyle(text: string): string {
    for (const [style, patterns] of Object.entries(this.stylePatterns)) {
      if (patterns.some(pattern => text.includes(pattern))) {
        return style
      }
    }
    return 'realistic' // Default style
  }

  private detectMood(text: string): string {
    for (const [mood, patterns] of Object.entries(this.moodPatterns)) {
      if (patterns.some(pattern => text.includes(pattern))) {
        return mood
      }
    }
    return 'neutral' // Default mood
  }

  private detectCharacters(text: string): string[] {
    const foundCharacters: string[] = []
    
    for (const character of this.characterPatterns) {
      if (text.includes(character)) {
        foundCharacters.push(character)
      }
    }
    
    return foundCharacters.slice(0, 5) // Limit to 5 characters
  }

  private detectItems(text: string): string[] {
    const foundItems: string[] = []
    
    for (const item of this.itemPatterns) {
      if (text.includes(item)) {
        foundItems.push(item)
      }
    }
    
    return foundItems.slice(0, 8) // Limit to 8 items
  }

  private extractSetting(text: string): string | undefined {
    const settingPatterns = [
      'forest', 'city', 'beach', 'mountain', 'desert', 'ocean',
      'space', 'underwater', 'cave', 'castle', 'house', 'garden',
      'street', 'office', 'school', 'hospital', 'restaurant', 'park'
    ]
    
    for (const setting of settingPatterns) {
      if (text.includes(setting)) {
        return setting
      }
    }
    
    return undefined
  }

  private extractAction(text: string): string | undefined {
    const actionPatterns = [
      'running', 'walking', 'sitting', 'standing', 'flying', 'swimming',
      'fighting', 'dancing', 'singing', 'reading', 'writing', 'cooking',
      'sleeping', 'playing', 'working', 'traveling', 'exploring', 'building'
    ]
    
    for (const action of actionPatterns) {
      if (text.includes(action)) {
        return action
      }
    }
    
    return undefined
  }

  private extractColors(text: string): string[] {
    const colorPatterns = [
      'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink',
      'black', 'white', 'gray', 'brown', 'gold', 'silver',
      'cyan', 'magenta', 'lime', 'navy', 'teal', 'indigo'
    ]
    
    const foundColors: string[] = []
    
    for (const color of colorPatterns) {
      if (text.includes(color)) {
        foundColors.push(color)
      }
    }
    
    return foundColors.slice(0, 6) // Limit to 6 colors
  }

  private extractComposition(text: string): string | undefined {
    const compositionPatterns = [
      'portrait', 'landscape', 'close-up', 'wide shot', 'aerial view',
      'macro', 'panorama', 'bird\'s eye view', 'low angle', 'high angle'
    ]
    
    for (const composition of compositionPatterns) {
      if (text.includes(composition)) {
        return composition
      }
    }
    
    return undefined
  }

  private extractLighting(text: string): string | undefined {
    const lightingPatterns = [
      'sunlight', 'moonlight', 'sunrise', 'sunset', 'dawn', 'dusk',
      'neon', 'candlelight', 'spotlight', 'natural', 'artificial',
      'bright', 'dark', 'dim', 'glowing', 'shadows'
    ]
    
    for (const lighting of lightingPatterns) {
      if (text.includes(lighting)) {
        return lighting
      }
    }
    
    return undefined
  }

  // Quick template generators
  generateQuickTemplate(type: 'portrait' | 'landscape' | 'action' | 'fantasy' | 'sci-fi'): string {
    const templates = {
      portrait: 'A detailed portrait of a person with expressive eyes and soft lighting',
      landscape: 'A beautiful landscape with mountains, trees, and dramatic lighting',
      action: 'An action scene with dynamic movement and intense emotions',
      fantasy: 'A magical fantasy scene with mystical creatures and enchanted elements',
      'sci-fi': 'A futuristic sci-fi scene with advanced technology and alien worlds'
    }
    
    return templates[type]
  }

  // Validate Jason format
  validateJasonFormat(format: JasonFormat): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!format.jason_text || format.jason_text.trim() === '') {
      errors.push('Jason text is required')
    }
    
    if (!format.style) {
      errors.push('Style is required')
    }
    
    if (!format.mood) {
      errors.push('Mood is required')
    }
    
    if (!format.characters || format.characters.length === 0) {
      errors.push('At least one character is recommended')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// Create singleton instance
export const jasonTranslator = new JasonTranslator()