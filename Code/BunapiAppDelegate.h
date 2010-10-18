//
//  BunapiAppDelegate.h
//  Bunapi
//
//  Created by Yung-Luen Lan on 10/11/10.
//  Copyright 2010 yllan.org. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface BunapiAppDelegate : NSObject <NSApplicationDelegate> {
    NSWindow *window;
	WebView *_webView;
}

@property (nonatomic, retain) IBOutlet WebView *webView;
@property (assign) IBOutlet NSWindow *window;

@end

