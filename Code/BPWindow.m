//
//  BPWindow.m
//  Bunapi
//
//  Created by Yung-Luen Lan on 10/11/10.
//  Copyright 2010 HTC. All rights reserved.
//

#import "BPWindow.h"


@implementation BPWindow

@synthesize webView = _webView;
@synthesize actor = _actor;

- (id) initWithContentRect: (NSRect)contentRect
				 styleMask: (NSUInteger)windowStyle
				   backing: (NSBackingStoreType)bufferingType
					 defer: (BOOL)deferCreation
{
	self = [super initWithContentRect: contentRect styleMask: NSBorderlessWindowMask backing: bufferingType defer: deferCreation];

	if (self) {
		[self setOpaque:NO];
		[self setBackgroundColor:[NSColor clearColor]];
		_webView = [[BPWebView alloc] initWithFrame: NSMakeRect(0, 0, contentRect.size.width, contentRect.size.height) frameName: nil groupName: nil];
		[_webView setAutoresizingMask: NSViewWidthSizable | NSViewHeightSizable];
		[[self contentView] addSubview: _webView];
		
	}
	return self;
}

- (BOOL) hasShadow
{
	return NO;
}


- (void)dealloc {
	[_webView release], _webView = nil;
	[_actor release], _actor = nil;
	[super dealloc];
}
@end


