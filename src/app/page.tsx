'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, Sparkles, Info, FileText } from "lucide-react"
import { jasonTranslator, JasonFormat } from "@/services/jason-translator"
import { nanoPrompt, NanoPromptResult } from "@/services/nano-prompt"
import { nanoCoder, NanoCoderResult } from "@/services/nano-coder"


export default function HomePage() {
  const [inputText, setInputText] = useState('')
  const [jasonFormat, setJasonFormat] = useState<JasonFormat | null>(null)
  const [nanoPromptResult, setNanoPromptResult] = useState<NanoPromptResult | null>(null)
  const [nanoCoderResult, setNanoCoderResult] = useState<NanoCoderResult | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [isCoding, setIsCoding] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'jason' | 'nano' | 'code'>('jason')

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setIsTranslating(true)
    try {
      const result = await jasonTranslator.translateToJason(inputText)
      setJasonFormat(result)
      setNanoPromptResult(null) // Clear nano prompt result
    } catch (error) {
      console.error('Translation failed:', error)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleNanoOptimize = async () => {
    if (!inputText.trim()) return

    setIsOptimizing(true)
    try {
      const result = await nanoPrompt.optimizePrompt(inputText)
      setNanoPromptResult(result)
      setJasonFormat(null) // Clear jason format result
      setNanoCoderResult(null) // Clear nano coder result
    } catch (error) {
      console.error('Nano optimization failed:', error)
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleNanoCode = async () => {
    if (!inputText.trim()) return

    setIsCoding(true)
    try {
      const result = await nanoCoder.optimizePrompt(inputText)
      setNanoCoderResult(result)
      setJasonFormat(null) // Clear jason format result
      setNanoPromptResult(null) // Clear nano prompt result
    } catch (error) {
      console.error('Nano coding failed:', error)
    } finally {
      setIsCoding(false)
    }
  }

  const handleCopy = async () => {
    if (!jasonFormat) return

    try {
      await navigator.clipboard.writeText(jasonFormat.jason_text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleDownload = () => {
    if (!jasonFormat) return

    const dataStr = JSON.stringify(jasonFormat, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `jason-format-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleCopyNanoPrompt = async () => {
    if (!nanoPromptResult) return

    try {
      await navigator.clipboard.writeText(nanoPromptResult.jason_format)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleDownloadNanoPrompt = () => {
    if (!nanoPromptResult) return

    const dataStr = JSON.stringify(nanoPromptResult, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nano-prompt-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleCopyNanoCoder = async () => {
    if (!nanoCoderResult) return

    try {
      await navigator.clipboard.writeText(nanoCoderResult.jason_format)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleDownloadNanoCoder = () => {
    if (!nanoCoderResult) return

    const dataStr = JSON.stringify(nanoCoderResult, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nano-coder-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const quickTemplates = [
    { text: "A magical forest with glowing mushrooms and fairies", label: "Fantasy Scene" },
    { text: "Futuristic city skyline at sunset with flying cars", label: "Sci-Fi City" },
    { text: "Cozy cabin in the woods with warm lights", label: "Peaceful Nature" },
    { text: "Dragon breathing fire in a medieval castle", label: "Epic Fantasy" }
  ]

  const nanoQuickTemplates = [
    { text: "A beautiful portrait of a woman", label: "Portrait" },
    { text: "Mountains at sunset", label: "Landscape" },
    { text: "A superhero character", label: "Character" },
    { text: "A smartphone product", label: "Product" }
  ]

  const nanoCoderQuickTemplates = [
    { text: "React web application with TypeScript", label: "Web App" },
    { text: "React Native mobile app", label: "Mobile App" },
    { text: "Node.js microservice with REST API", label: "Microservice" },
    { text: "REST API with authentication", label: "API" },
    { text: "Data visualization dashboard", label: "Dashboard" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            NanoJason
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Universal AI Prompt Language Translator & Optimizer
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Convert natural language descriptions to Jason format and optimize for maximum AI accuracy
          </p>
        </div>

         {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveTab('jason')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'jason'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Jason Translator
            </button>
            <button
              onClick={() => setActiveTab('nano')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'nano'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              NanoPrompt
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'code'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              NanoCoder
            </button>
          </div>
        </div>

        {/* Jason Translator */}
        {activeTab === 'jason' && (
          <Card className="mb-12 border-2 border-blue-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-blue-600" />
                Jason Language Translator
              </CardTitle>
              <CardDescription className="text-lg">
                Describe what you want to create, and I'll convert it to universal Jason format
              </CardDescription>
            </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Quick Templates */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Quick Templates:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {quickTemplates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputText(template.text)}
                    className="text-xs h-auto py-2 px-3 whitespace-normal text-left"
                  >
                    {template.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your image:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="A beautiful landscape with mountains and a lake at sunset..."
                className="min-h-32 border-2 border-gray-200 focus:border-blue-400 rounded-lg p-3 w-full"
              />
            </div>

            {/* Translate Button */}
            <Button
              onClick={handleTranslate}
              disabled={!inputText.trim() || isTranslating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
            >
              {isTranslating ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Translating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Translate to Jason Format
                </span>
              )}
            </Button>

            {/* Results */}
            {jasonFormat && (
              <div className="space-y-4 mt-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-green-800 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Jason Format Result
                    </h4>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {copied ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                            Copied!
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Copy className="h-3 w-3" />
                            Copy
                          </span>
                        )}
                      </Button>
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                      {JSON.stringify(jasonFormat, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Format Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    About Jason Format
                  </h5>
                  <p className="text-sm text-blue-700">
                    Jason is a universal prompt language that works with all AI image generators. 
                    It includes detailed style, mood, character, and item information for consistent results.
                  </p>
                </div>

                {/* Style Badges */}
                <div className="flex flex-wrap gap-2">
                  {jasonFormat.style && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      Style: {jasonFormat.style}
                    </span>
                  )}
                  {jasonFormat.mood && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      Mood: {jasonFormat.mood}
                    </span>
                  )}
                  {jasonFormat.characters && jasonFormat.characters.length > 0 && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      Characters: {jasonFormat.characters.join(', ')}
                    </span>
                  )}
                  {jasonFormat.items && jasonFormat.items.length > 0 && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                      Items: {jasonFormat.items.join(', ')}
                    </span>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          </Card>
        )}

        {/* NanoPrompt Optimizer */}
        {activeTab === 'nano' && (
          <Card className="mb-12 border-2 border-purple-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-purple-600" />
                NanoPrompt Optimizer
              </CardTitle>
              <CardDescription className="text-lg">
                Deep reverse engineering for maximum AI accuracy and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Quick Templates */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Quick Templates:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {nanoQuickTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputText(template.text)}
                      className="text-xs h-auto py-2 px-3 whitespace-normal text-left"
                    >
                      {template.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your English prompt:
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="A beautiful portrait of a woman..."
                  className="min-h-32 border-2 border-gray-200 focus:border-purple-400 rounded-lg p-3 w-full"
                />
              </div>

              {/* Optimize Button */}
              <Button
                onClick={handleNanoOptimize}
                disabled={!inputText.trim() || isOptimizing}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-lg"
              >
                {isOptimizing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Optimizing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Optimize with NanoPrompt
                  </span>
                )}
              </Button>

              {/* Results */}
              {nanoPromptResult && (
                <div className="space-y-4 mt-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-purple-800 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        NanoPrompt Optimization Result
                      </h4>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleCopyNanoPrompt()}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          {copied ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                              Copied!
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Copy className="h-3 w-3" />
                              Copy
                            </span>
                          )}
                        </Button>
                        <Button
                          onClick={() => handleDownloadNanoPrompt()}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    {/* Score */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Accuracy Score:</span>
                        <span className="text-lg font-bold text-green-600">{nanoPromptResult.accuracy_score}%</span>
                      </div>
                    </div>
                    
                    {/* Original vs Optimized */}
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <div className="text-xs text-gray-500 font-medium mb-1">Original:</div>
                        <div className="bg-gray-50 rounded p-2 text-sm text-gray-800">
                          {nanoPromptResult.original_prompt}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium mb-1">Optimized:</div>
                        <div className="bg-purple-50 rounded p-2 text-sm text-purple-800">
                          {nanoPromptResult.nano_prompt}
                        </div>
                      </div>
                    </div>
                    
                    {/* Optimizations Applied */}
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 font-medium mb-1">Optimizations Applied:</div>
                      <div className="flex flex-wrap gap-1">
                        {nanoPromptResult.optimizations_applied.map((opt, index) => (
                          <span key={index} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Performance Tips */}
                    <div>
                      <div className="text-xs text-gray-500 font-medium mb-1">Performance Tips:</div>
                      <ul className="text-xs text-gray-700 space-y-1">
                        {nanoPromptResult.performance_tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Jason Format */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Optimized Jason Format
                    </h5>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                        {nanoPromptResult.jason_format}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* NanoCoder Optimizer */}
        {activeTab === 'code' && (
          <Card className="mb-12 border-2 border-green-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-green-600" />
                NanoCoder Technical Optimizer
              </CardTitle>
              <CardDescription className="text-lg">
                Deep reverse engineering for maximum coding and engineering accuracy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Quick Templates */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Technical Templates:</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {nanoCoderQuickTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputText(template.text)}
                      className="text-xs h-auto py-2 px-3 whitespace-normal text-left"
                    >
                      {template.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your technical prompt:
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="React web application with TypeScript..."
                  className="min-h-32 border-2 border-gray-200 focus:border-green-400 rounded-lg p-3 w-full"
                />
              </div>

              {/* Optimize Button */}
              <Button
                onClick={handleNanoCode}
                disabled={!inputText.trim() || isCoding}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 text-lg"
              >
                {isCoding ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Optimizing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Optimize with NanoCoder
                  </span>
                )}
              </Button>

              {/* Results */}
              {nanoCoderResult && (
                <div className="space-y-4 mt-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-green-800 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        NanoCoder Technical Result
                      </h4>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleCopyNanoCoder()}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          {copied ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                              Copied!
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Copy className="h-3 w-3" />
                              Copy
                            </span>
                          )}
                        </Button>
                        <Button
                          onClick={() => handleDownloadNanoCoder()}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    {/* Score */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Technical Accuracy:</span>
                        <span className="text-lg font-bold text-green-600">{nanoCoderResult.accuracy_score}%</span>
                      </div>
                    </div>
                    
                    {/* Original vs Optimized */}
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <div className="text-xs text-gray-500 font-medium mb-1">Original:</div>
                        <div className="bg-gray-50 rounded p-2 text-sm text-gray-800">
                          {nanoCoderResult.original_prompt}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium mb-1">Technical:</div>
                        <div className="bg-green-50 rounded p-2 text-sm text-green-800">
                          {nanoCoderResult.nano_coder_prompt}
                        </div>
                      </div>
                    </div>
                    
                    {/* Technical Specifications */}
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 font-medium mb-1">Technical Specifications:</div>
                      <div className="flex flex-wrap gap-1">
                        {nanoCoderResult.technical_specifications.map((spec, index) => (
                          <span key={index} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Code Context */}
                    {nanoCoderResult.code_context.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 font-medium mb-1">Code Context:</div>
                        <div className="bg-blue-50 rounded p-2 text-xs text-blue-800">
                          {nanoCoderResult.code_context.join(', ')}
                        </div>
                      </div>
                    )}
                    
                    {/* Performance Tips */}
                    <div>
                      <div className="text-xs text-gray-500 font-medium mb-1">Technical Tips:</div>
                      <ul className="text-xs text-gray-700 space-y-1">
                        {nanoCoderResult.performance_tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technical Jason Format */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Technical Jason Format
                    </h5>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                        {nanoCoderResult.jason_format}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Developer Section */}
        <div className="mt-16 text-center py-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Developed by Roman | RyzenAdvanced</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium">GitHub:</span>
                <a 
                  href="https://github.com/roman-ryzenadvanced/Custom-Engineered-Agents-and-Tools-for-Vibe-Coders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Custom Engineered Agents and Tools for Vibe Coders
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Tools:</span>
                <a 
                  href="https://z.ai/subscribe?ic=R0K78RJKNW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 underline"
                >
                  GLM 4.6 Coding Model
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Built with:</span>
                <a 
                  href="https://www.trae.ai/s/WJtxyE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  TRAE IDE
                </a>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}