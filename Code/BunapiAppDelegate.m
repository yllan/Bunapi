//
//  BunapiAppDelegate.m
//  Bunapi
//
//  Created by Yung-Luen Lan on 10/11/10.
//  Copyright 2010 yllan.org. All rights reserved.
//

#import "BunapiAppDelegate.h"

@implementation BunapiAppDelegate

@synthesize webView = _webView;
@synthesize window;

- (void) applicationDidFinishLaunching: (NSNotification *)aNotification {
	[_webView setDrawsBackground: NO];
	[[_webView mainFrame] loadHTMLString: @"<style>body { background-color: rgba(0,0,0,0); }</style><img src=\"http://localhost/megaman.gif\" />" baseURL: nil];
}


- (void) dealloc {
	[_webView release], _webView = nil;
	[super dealloc];
}

@end
