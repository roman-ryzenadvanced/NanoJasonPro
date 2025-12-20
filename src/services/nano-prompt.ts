// NanoPrompt - Deep Reverse Engineered Jason Prompt Optimizer
// Translates English requests into optimized Jason prompts for maximum AI accuracy

export interface NanoPromptResult {
  original_prompt: string
  nano_prompt: string
  jason_format: string
  optimizations_applied: string[]
  accuracy_score: number
  performance_tips: string[]
}

export class NanoPrompt {
  // AI model optimization patterns
  private modelOptimizations = {
    // Quality descriptors for maximum detail
    quality: [
      'ultra-detailed', 'high-resolution', 'photorealistic', '8k', '4k',
      'masterpiece', 'best quality', 'highest detail', 'professional',
      'award-winning', 'cinematic quality', 'hyperrealistic'
    ],
    
    // Style-specific keywords
    styles: {
      realistic: ['photorealistic', 'lifelike', 'natural lighting', 'real-world', 'detailed texture'],
      anime: ['anime style', 'manga art', 'japanese animation', 'studio ghibli style', 'cel shading'],
      fantasy: ['fantasy art', 'magical', 'enchanted', 'mythical', 'ethereal', 'dreamlike'],
      scifi: ['sci-fi art', 'futuristic', 'cyberpunk aesthetic', 'high-tech', 'advanced technology'],
      abstract: ['abstract art', 'geometric patterns', 'modern art', 'contemporary', 'artistic']
    },
    
    // Composition and framing
    composition: [
      'perfect composition', 'rule of thirds', 'golden ratio', 'balanced framing',
      'dynamic perspective', 'depth of field', 'bokeh effect', 'professional photography'
    ],
    
    // Lighting keywords
    lighting: [
      'dramatic lighting', 'cinematic lighting', 'volumetric lighting', 'soft shadows',
      'golden hour', 'blue hour', 'rim lighting', 'three-point lighting', 'natural light'
    ],
    
    // Color enhancement
    colors: [
      'vibrant colors', 'color harmony', 'color grading', 'professional color palette',
      'rich saturation', 'accurate colors', 'color correction', 'cinematic color grading'
    ],
    
    // Detail and texture
    details: [
      'intricate details', 'fine textures', 'surface details', 'micro details',
      'hyper-detailed', 'pixel-perfect', 'sharp focus', 'crisp details'
    ],
    
    // Error elimination patterns
    error_prevention: [
      'no distortion', 'no artifacts', 'clean image', 'no noise',
      'no blur', 'proper anatomy', 'correct proportions', 'no glitches'
    ]
  }

  // Common English patterns and their Jason equivalents
  private patternMappings = {
    // Basic descriptions
    'a picture of': 'high-quality photograph of',
    'an image of': 'professional photograph of',
    'drawing of': 'detailed illustration of',
    'painting of': 'masterpiece painting of',
    'photo of': 'ultra-realistic photograph of',
    
    // Quality improvements
    'nice': 'exceptional',
    'good': 'outstanding',
    'beautiful': 'breathtakingly beautiful',
    'pretty': 'stunningly attractive',
    'cool': 'impressive',
    'amazing': 'extraordinary',
    
    // Style specifications
    'simple': 'elegant minimalist',
    'complex': 'intricate detailed',
    'modern': 'contemporary sophisticated',
    'old': 'vintage classic',
    'new': 'cutting-edge',
    
    // Lighting improvements
    'bright': 'well-lit with bright illumination',
    'dark': 'dramatic low-key lighting',
    'sunny': 'golden hour sunlight',
    'night': 'cinematic night lighting',
    
    // Composition
    'close up': 'detailed close-up shot',
    'wide': 'expansive wide-angle view',
    'top': 'bird\'s eye view',
    'side': 'profile perspective',
    
    // Error prevention
    'without': 'excluding',
    'no': 'absence of',
    'avoid': 'carefully avoiding',
    'don\'t': 'ensuring no'
  }

  async optimizePrompt(englishPrompt: string): Promise<NanoPromptResult> {
    const optimizations_applied: string[] = []
    let optimizedPrompt = englishPrompt.toLowerCase()
    
    // Step 1: Apply pattern mappings
    optimizedPrompt = this.applyPatternMappings(optimizedPrompt, optimizations_applied)
    
    // Step 2: Detect and enhance style
    const detectedStyle = this.detectStyle(optimizedPrompt)
    if (detectedStyle) {
      optimizedPrompt = this.enhanceStyle(optimizedPrompt, detectedStyle, optimizations_applied)
    }
    
    // Step 3: Add quality descriptors
    optimizedPrompt = this.addQualityDescriptors(optimizedPrompt, optimizations_applied)
    
    // Step 4: Optimize composition
    optimizedPrompt = this.optimizeComposition(optimizedPrompt, optimizations_applied)
    
    // Step 5: Enhance lighting
    optimizedPrompt = this.enhanceLighting(optimizedPrompt, optimizations_applied)
    
    // Step 6: Add color optimization
    optimizedPrompt = this.optimizeColors(optimizedPrompt, optimizations_applied)
    
    // Step 7: Add detail enhancement
    optimizedPrompt = this.enhanceDetails(optimizedPrompt, optimizations_applied)
    
    // Step 8: Add error prevention
    optimizedPrompt = this.addErrorPrevention(optimizedPrompt, optimizations_applied)
    
    // Step 9: Generate Jason format
    const jasonFormat = this.generateJasonFormat(optimizedPrompt, detectedStyle)
    
    // Step 10: Calculate accuracy score
    const accuracyScore = this.calculateAccuracyScore(optimizations_applied)
    
    // Step 11: Generate performance tips
    const performanceTips = this.generatePerformanceTips(optimizations_applied, detectedStyle)
    
    return {
      original_prompt: englishPrompt,
      nano_prompt: optimizedPrompt,
      jason_format: jasonFormat,
      optimizations_applied: optimizations_applied,
      accuracy_score: accuracyScore,
      performance_tips: performanceTips
    }
  }

  private applyPatternMappings(prompt: string, optimizations: string[]): string {
    let optimized = prompt
    
    for (const [pattern, replacement] of Object.entries(this.patternMappings)) {
      if (optimized.includes(pattern)) {
        optimized = optimized.replace(new RegExp(pattern, 'g'), replacement)
        optimizations.push(`Pattern mapping: "${pattern}" → "${replacement}"`)
      }
    }
    
    return optimized
  }

  private detectStyle(prompt: string): string {
    for (const [style, keywords] of Object.entries(this.modelOptimizations.styles)) {
      if (keywords.some(keyword => prompt.includes(keyword))) {
        return style
      }
    }
    return 'realistic' // Default style
  }

  private enhanceStyle(prompt: string, style: string, optimizations: string[]): string {
    const styleKeywords = this.modelOptimizations.styles[style as keyof typeof this.modelOptimizations.styles]
    if (styleKeywords) {
      const keyword = styleKeywords[Math.floor(Math.random() * styleKeywords.length)]
      if (!prompt.includes(keyword)) {
        const enhanced = `${prompt}, ${keyword}`
        optimizations.push(`Style enhancement: Added "${keyword}" for ${style} style`)
        return enhanced
      }
    }
    return prompt
  }

  private addQualityDescriptors(prompt: string, optimizations: string[]): string {
    const qualityKeywords = this.modelOptimizations.quality
    const selectedQuality = qualityKeywords[Math.floor(Math.random() * Math.min(3, qualityKeywords.length))]
    
    if (!prompt.includes(selectedQuality) && !prompt.includes('quality')) {
      const enhanced = `${prompt}, ${selectedQuality}`
      optimizations.push(`Quality enhancement: Added "${selectedQuality}"`)
      return enhanced
    }
    return prompt
  }

  private optimizeComposition(prompt: string, optimizations: string[]): string {
    const compositionKeywords = this.modelOptimizations.composition
    const selectedComposition = compositionKeywords[Math.floor(Math.random() * compositionKeywords.length)]
    
    if (!prompt.includes('composition') && !prompt.includes('framing')) {
      const enhanced = `${prompt}, ${selectedComposition}`
      optimizations.push(`Composition optimization: Added "${selectedComposition}"`)
      return enhanced
    }
    return prompt
  }

  private enhanceLighting(prompt: string, optimizations: string[]): string {
    const lightingKeywords = this.modelOptimizations.lighting
    const selectedLighting = lightingKeywords[Math.floor(Math.random() * lightingKeywords.length)]
    
    if (!prompt.includes('lighting') && !prompt.includes('light')) {
      const enhanced = `${prompt}, ${selectedLighting}`
      optimizations.push(`Lighting enhancement: Added "${selectedLighting}"`)
      return enhanced
    }
    return prompt
  }

  private optimizeColors(prompt: string, optimizations: string[]): string {
    const colorKeywords = this.modelOptimizations.colors
    const selectedColor = colorKeywords[Math.floor(Math.random() * colorKeywords.length)]
    
    if (!prompt.includes('color') && !prompt.includes('saturation')) {
      const enhanced = `${prompt}, ${selectedColor}`
      optimizations.push(`Color optimization: Added "${selectedColor}"`)
      return enhanced
    }
    return prompt
  }

  private enhanceDetails(prompt: string, optimizations: string[]): string {
    const detailKeywords = this.modelOptimizations.details
    const selectedDetail = detailKeywords[Math.floor(Math.random() * detailKeywords.length)]
    
    if (!prompt.includes('detail') && !prompt.includes('texture')) {
      const enhanced = `${prompt}, ${selectedDetail}`
      optimizations.push(`Detail enhancement: Added "${selectedDetail}"`)
      return enhanced
    }
    return prompt
  }

  private addErrorPrevention(prompt: string, optimizations: string[]): string {
    const errorKeywords = this.modelOptimizations.error_prevention
    const selectedErrorPrevention = errorKeywords[Math.floor(Math.random() * 2)] // Use 2 for less aggressive
    
    if (!prompt.includes('no') && !prompt.includes('without')) {
      const enhanced = `${prompt}, ${selectedErrorPrevention}`
      optimizations.push(`Error prevention: Added "${selectedErrorPrevention}"`)
      return enhanced
    }
    return prompt
  }

  private generateJasonFormat(optimizedPrompt: string, style: string): string {
    const jasonStructure = {
      prompt: optimizedPrompt,
      version: '2.0', // NanoPrompt enhanced version
      type: 'optimized_image_generation',
      optimization: {
        style: style,
        quality: 'maximum',
        accuracy: 'enhanced',
        error_reduction: 'active'
      },
      metadata: {
        created_by: 'NanoPrompt',
        optimization_level: 'deep_reverse_engineered',
        timestamp: new Date().toISOString()
      }
    }
    
    return JSON.stringify(jasonStructure, null, 2)
  }

  private calculateAccuracyScore(optimizations: string[]): number {
    // Base score starts at 60%
    let score = 60
    
    // Add points for each optimization category
    const categories = {
      'Pattern mapping': 5,
      'Style enhancement': 8,
      'Quality enhancement': 10,
      'Composition optimization': 7,
      'Lighting enhancement': 6,
      'Color optimization': 5,
      'Detail enhancement': 8,
      'Error prevention': 6
    }
    
    for (const optimization of optimizations) {
      for (const [category, points] of Object.entries(categories)) {
        if (optimization.includes(category)) {
          score += points
          break
        }
      }
    }
    
    // Cap at 95%
    return Math.min(95, score)
  }

  private generatePerformanceTips(optimizations: string[], style: string): string[] {
    const tips: string[] = []
    
    // Style-specific tips
    if (style === 'realistic') {
      tips.push('Use specific camera settings for photorealistic results')
      tips.push('Include lighting direction information')
    } else if (style === 'anime') {
      tips.push('Specify art style (e.g., Studio Ghibli, Makoto Shinkai)')
      tips.push('Include character design elements')
    } else if (style === 'fantasy') {
      tips.push('Add magical element descriptions')
      tips.push('Specify atmosphere and mood details')
    }
    
    // General tips based on optimizations
    if (optimizations.some(opt => opt.includes('Quality'))) {
      tips.push('High quality descriptors increase rendering time but improve results')
    }
    
    if (optimizations.some(opt => opt.includes('Error prevention'))) {
      tips.push('Error prevention keywords reduce common AI generation issues')
    }
    
    if (optimizations.some(opt => opt.includes('Composition'))) {
      tips.push('Composition keywords help with framing and balance')
    }
    
    return tips
  }

  // Quick optimization templates
  generateQuickOptimization(type: 'portrait' | 'landscape' | 'character' | 'object'): string {
    const templates = {
      portrait: 'Professional portrait photography, ultra-detailed, perfect composition, dramatic lighting, high resolution, no artifacts',
      landscape: 'Breathtaking landscape photography, wide-angle view, vibrant colors, golden hour lighting, cinematic quality, hyper-detailed',
      character: 'Character design, detailed features, expressive pose, proper anatomy, clean lines, professional quality, no distortion',
      object: 'Product photography, studio lighting, sharp focus, detailed textures, accurate colors, professional composition'
    }
    
    return templates[type]
  }

  // Batch optimization for multiple prompts
  async optimizeBatch(prompts: string[]): Promise<NanoPromptResult[]> {
    const results: NanoPromptResult[] = []
    
    for (const prompt of prompts) {
      try {
        const result = await this.optimizePrompt(prompt)
        results.push(result)
      } catch (error) {
        console.error(`Failed to optimize prompt: ${prompt}`, error)
      }
    }
    
    return results
  }
}

// Create singleton instance
export const nanoPrompt = new NanoPrompt()